'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  getLicenseFromStorage, 
  getCurrentDomain, 
  validateLicense, 
  saveLicenseToStorage,
  detectTampering
} from '@/lib/licenseUtils';
import LicenseActivation from '@/components/license/LicenseActivation';

interface LicenseContextType {
  isLicenseValid: boolean;
  isChecking: boolean;
  licenseKey: string | null;
  refreshLicense: () => Promise<boolean>;
}

const LicenseContext = createContext<LicenseContextType>({
  isLicenseValid: false,
  isChecking: true,
  licenseKey: null,
  refreshLicense: async () => false,
});

export const useLicense = () => useContext(LicenseContext);

interface LicenseProviderProps {
  children: React.ReactNode;
}

export const LicenseProvider: React.FC<LicenseProviderProps> = ({ children }) => {
  const [isLicenseValid, setIsLicenseValid] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [currentDomain, setCurrentDomain] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [lastVerificationTime, setLastVerificationTime] = useState<number>(0);
  
  // Function to verify the license with debouncing
  const verifyLicense = useCallback(async (force = false) => {
    if (typeof window === 'undefined') return false;
    
    const now = Date.now();
    const timeSinceLastVerification = now - lastVerificationTime;
    
    // Prevent concurrent verifications and rate limit checks
    if (isVerifying || (!force && timeSinceLastVerification < 10000)) {
      return isLicenseValid;
    }
    
    setIsVerifying(true);
    setLastVerificationTime(now);
    
    try {
      const domain = getCurrentDomain();
      setCurrentDomain(domain);
      
      // Try server-side validation
      try {
        const serverResponse = await fetch('/api/license/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain })
        });
        
        if (serverResponse.ok) {
          const { isValid } = await serverResponse.json();
          
          if (isValid) {
            setIsLicenseValid(true);
            setIsChecking(false);
            setShowVerification(false);
            setIsVerifying(false);
            return true;
          }
        }
      } catch (serverError) {
        console.warn('Server validation failed, falling back to client storage');
      }
      
      // Check client-side storage
      const licenseData = await getLicenseFromStorage();
      
      if (!licenseData || licenseData.domain !== domain) {
        setIsLicenseValid(false);
        setIsChecking(false);
        setShowVerification(true);
        setIsVerifying(false);
        return false;
      }
      
      const isValid = await validateLicense(licenseData.license, domain);
      
      setLicenseKey(licenseData.license);
      setIsLicenseValid(isValid);
      setIsChecking(false);
      setShowVerification(!isValid);
      
      return isValid;
    } catch (error) {
      console.error('License verification error:', error);
      setIsLicenseValid(false);
      setIsChecking(false);
      setShowVerification(true);
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, [isLicenseValid, lastVerificationTime, isVerifying]);

  // Public method to refresh license
  const refreshLicense = useCallback(async () => {
    return await verifyLicense(true);
  }, [verifyLicense]);

  // Check for tampering
  useEffect(() => {
    let tamperCheckInterval: NodeJS.Timeout;
    
    if (typeof window !== 'undefined') {
      const checkForTampering = () => {
        const randomDelay = 30000 + Math.floor(Math.random() * 30000); // 30-60 seconds
        
        tamperCheckInterval = setTimeout(() => {
          const isTampered = detectTampering();
          if (isTampered) {
            setIsLicenseValid(false);
            setShowVerification(true);
          }
          checkForTampering();
        }, randomDelay);
      };
      
      checkForTampering();
    }
    
    return () => {
      if (tamperCheckInterval) {
        clearTimeout(tamperCheckInterval);
      }
    };
  }, []);

  // Initial license verification
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial verification
    verifyLicense();
    
    // Set up periodic verification with longer interval
    const verificationInterval = setInterval(() => {
      verifyLicense(true);
    }, 3600000); // Check every hour
    
    return () => {
      clearInterval(verificationInterval);
    };
  }, [verifyLicense]);

  return (
    <LicenseContext.Provider
      value={{
        isLicenseValid,
        isChecking,
        licenseKey,
        refreshLicense,
      }}
    >
      {!isChecking && !isLicenseValid && showVerification && (
        <LicenseActivation 
          domain={currentDomain} 
          onActivated={() => {
            verifyLicense(true);
            setShowVerification(false);
          }} 
        />
      )}
      {children}
    </LicenseContext.Provider>
  );
};

export default LicenseProvider;