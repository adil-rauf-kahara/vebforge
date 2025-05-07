'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  getLicenseFromLocalStorage, 
  getCurrentDomain, 
  validateLicense, 
  saveLicenseToLocalStorage,
  detectTampering
} from '@/lib/licenseUtils';
import LicenseActivation from '@/components/license/LicenseActivation';

interface LicenseContextType {
  isLicenseValid: boolean;
  isChecking: boolean;
  licenseKey: string | null;
}

const LicenseContext = createContext<LicenseContextType>({
  isLicenseValid: false,
  isChecking: true,
  licenseKey: null,
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

  // Function to verify the license
  const verifyLicense = useCallback(async (force = false) => {
    if (typeof window === 'undefined') return;
    
    // Check for URL parameter first
    if (!force) {
      const urlParams = new URLSearchParams(window.location.search);
      const licenseFromUrl = urlParams.get('license');
      
      if (licenseFromUrl) {
        const domain = getCurrentDomain();
        const isValid = await validateLicense(licenseFromUrl, domain);
        
        if (isValid) {
          saveLicenseToLocalStorage(licenseFromUrl, domain);
          
          // Clean URL by removing the license parameter
          window.history.replaceState({}, document.title, window.location.pathname);
          
          setLicenseKey(licenseFromUrl);
          setIsLicenseValid(true);
          setIsChecking(false);
          return true;
        }
      }
    }
    
    // Check localStorage for existing license
    const licenseData = getLicenseFromLocalStorage();
    const domain = getCurrentDomain();
    setCurrentDomain(domain);
    
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
    
    try {
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
  }, []);

  // Check for tampering
  useEffect(() => {
    let tamperCheckInterval: NodeJS.Timeout;
    
    if (typeof window !== 'undefined') {
      // Initial check
      const isTampered = detectTampering();
      if (isTampered) {
        setIsLicenseValid(false);
      }
      
      // Set up periodic checks
      tamperCheckInterval = setInterval(() => {
        const isTampered = detectTampering();
        if (isTampered) {
          setIsLicenseValid(false);
        }
      }, 30000); // Check every 30 seconds
    }
    
    return () => {
      if (tamperCheckInterval) {
        clearInterval(tamperCheckInterval);
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