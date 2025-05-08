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
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [currentDomain, setCurrentDomain] = useState<string>('');
  const [verificationAttempt, setVerificationAttempt] = useState<number>(0);
  
  // Function to verify the license
  const verifyLicense = useCallback(async (force = false) => {
    if (typeof window === 'undefined') return false;
    
    // Prevent excessive checks
    if (!force && verificationAttempt > 2) {
      return isLicenseValid;
    }
    
    setVerificationAttempt(prev => prev + 1);
    
    try {
      // First, try the server-side validation
      const domain = getCurrentDomain();
      setCurrentDomain(domain);
      
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
            return true;
          }
        }
      } catch (serverError) {
        console.warn('Server validation failed, falling back to client storage', serverError);
      }
      
      // Check for URL parameter
      if (!force) {
        const urlParams = new URLSearchParams(window.location.search);
        const licenseFromUrl = urlParams.get('license');
        
        if (licenseFromUrl) {
          const isValid = await validateLicense(licenseFromUrl, domain);
          
          if (isValid) {
            await saveLicenseToStorage(licenseFromUrl, domain);
            
            // Store on server if possible
            try {
              await fetch('/api/license/store', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ license: licenseFromUrl, domain })
              });
            } catch (e) {
              console.warn('Server storage failed:', e);
            }
            
            // Clean URL by removing the license parameter
            window.history.replaceState({}, document.title, window.location.pathname);
            
            setLicenseKey(licenseFromUrl);
            setIsLicenseValid(true);
            setIsChecking(false);
            return true;
          }
        }
      }
      
      // Check client-side storage for existing license
      const licenseData = await getLicenseFromStorage();
      
      if (!licenseData) {
        setIsLicenseValid(false);
        setIsChecking(false);
        return false;
      }
      
      // Verify if the saved domain matches current domain
      if (licenseData.domain !== domain) {
        setIsLicenseValid(false);
        setIsChecking(false);
        return false;
      }
      
      // Validate with the server
      const isValid = await validateLicense(licenseData.license, domain);
      
      setLicenseKey(licenseData.license);
      setIsLicenseValid(isValid);
      setIsChecking(false);
      
      return isValid;
    } catch (error) {
      console.error('License verification error:', error);
      setIsLicenseValid(false);
      setIsChecking(false);
      return false;
    }
  }, [isLicenseValid, verificationAttempt]);

  // Public method to refresh license
  const refreshLicense = useCallback(async () => {
    return await verifyLicense(true);
  }, [verifyLicense]);

  // Check for tampering
  useEffect(() => {
    let tamperCheckInterval: NodeJS.Timeout;
    
    if (typeof window !== 'undefined') {
      // Initial check
      const isTampered = detectTampering();
      if (isTampered) {
        setIsLicenseValid(false);
      }
      
      // Set up periodic checks with variable interval for unpredictability
      const checkForTampering = () => {
        const randomDelay = 15000 + Math.floor(Math.random() * 30000); // 15-45 seconds
        
        tamperCheckInterval = setTimeout(() => {
          const isTampered = detectTampering();
          if (isTampered) {
            setIsLicenseValid(false);
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

  // Verify license on initial load and set up periodic checks
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial verification
    verifyLicense();
    
    // Set up periodic verification
    const verificationInterval = setInterval(() => {
      verifyLicense(true);
    }, 3600000); // Verify every hour
    
    return () => {
      clearInterval(verificationInterval);
    };
  }, [verifyLicense]);

  // Handle license activation
  const handleLicenseActivated = useCallback(() => {
    verifyLicense(true);
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
      {!isChecking && !isLicenseValid ? (
        <LicenseActivation 
          domain={currentDomain} 
          onActivated={handleLicenseActivated} 
        />
      ) : null}
      {(isChecking || isLicenseValid) && children}
    </LicenseContext.Provider>
  );
};

export default LicenseProvider;