import { AES, enc } from 'crypto-js';

const ENCRYPTION_KEY = 'vebforge_license_key_2025';

export const encryptData = (data: any): string => {
  return AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

export const decryptData = (ciphertext: string): any => {
  try {
    const bytes = AES.decrypt(ciphertext, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(enc.Utf8));
  } catch (error) {
    return null;
  }
};

export const getLicenseFromLocalStorage = (): { license: string; domain: string } | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const encryptedLicense = localStorage.getItem('vebforge_license');
    if (!encryptedLicense) return null;
    
    return decryptData(encryptedLicense);
  } catch (error) {
    return null;
  }
};

export const saveLicenseToLocalStorage = (license: string, domain: string): void => {
  if (typeof window === 'undefined') return;
  
  const licenseData = { license, domain };
  const encryptedLicense = encryptData(licenseData);
  localStorage.setItem('vebforge_license', encryptedLicense);
};

export const removeLicenseFromLocalStorage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('vebforge_license');
};

export const getCurrentDomain = (): string => {
  if (typeof window === 'undefined') return '';
  
  // Extract just the hostname without protocol, paths, or port
  return window.location.hostname;
};

export const detectTampering = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    // Check if critical functions exist and haven't been modified
    const criticalFunctions = [
      getLicenseFromLocalStorage,
      validateLicense,
      detectTampering
    ];

    const functionsIntact = criticalFunctions.every(fn => {
      const fnString = fn.toString();
      return (
        typeof fn === 'function' &&
        fnString.length > 0 &&
        !fnString.includes('debugger')
      );
    });

    // Check if localStorage is available and not modified
    const storageAvailable = (() => {
      try {
        const testKey = '_vf_test_';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch {
        return false;
      }
    })();

    return !functionsIntact || !storageAvailable;
  } catch {
    // If any error occurs during checks, assume tampering
    return true;
  }
};

export const validateLicense = async (license: string, domain: string): Promise<boolean> => {
  try {
    const response = await fetch('https://mwnnuookrounjrcjqppm.supabase.co/functions/v1/validate-license', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13bm51b29rcm91bmpyY2pxcHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MDg2NTQsImV4cCI6MjA2MjE4NDY1NH0.cdsHXL6Bv6bMtMxuptUCiHVIwWKNUWzxZvCJyKhXTZk',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        licenseKey: license,
        domain: domain
      })
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('License validation error:', error);
    return false;
  }
};