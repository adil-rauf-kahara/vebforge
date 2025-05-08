'use client';

import React, { useState, useEffect } from 'react';
import { saveLicenseToStorage } from '@/lib/licenseUtils';
import { validateLicense } from '@/lib/licenseUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Lock, Loader2 } from 'lucide-react';

interface LicenseActivationProps {
  domain: string;
  onActivated: () => void;
}

const LicenseActivation: React.FC<LicenseActivationProps> = ({ domain, onActivated }) => {
  const [license, setLicense] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Check if license can be auto-activated from server file
  useEffect(() => {
    const checkServerLicense = async () => {
      try {
        const response = await fetch('/api/license/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain })
        });
        
        const data = await response.json();
        
        if (data.isValid) {
          setSuccess(true);
          setTimeout(() => {
            onActivated();
          }, 500);
        }
      } catch (error) {
        console.warn('Server license check failed:', error);
      } finally {
        setInitialLoading(false);
      }
    };
    
    checkServerLicense();
  }, [domain, onActivated]);

  const handleActivation = async () => {
    if (!license.trim()) {
      setError('Please enter a valid license key');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const isValid = await validateLicense(license, domain);

      if (isValid) {
        // Save license to both browser storage and server file
        await saveLicenseToStorage(license, domain);
        
        // Also save to server file
        try {
          await fetch('/api/license/store', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ license, domain })
          });
        } catch (e) {
          console.warn('Server storage failed:', e);
        }
        
        setSuccess(true);
        
        // Delay to show success message
        setTimeout(() => {
          onActivated();
        }, 1500);
      } else {
        setError('Invalid license key or domain. Please check and try again.');
      }
    } catch (err) {
      setError('Failed to verify license. Please try again later.');
      console.error('License verification failed:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  const redirectToVerification = () => {
    window.location.href = `https://license.vebtual.com/verify?domain=${encodeURIComponent(domain)}`;
  };

  // Return null during initial loading to avoid flickering
  if (initialLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 p-4">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-white animate-spin" />
          <p className="mt-4 text-white text-lg">Verifying license...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 p-4">
      <Card className="max-w-md w-full bg-[#0f0f0f] border border-gray-800 shadow-2xl">
        <div className="p-6 md:p-8">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2">License Activation Required</h2>
          <p className="text-muted-foreground text-center mb-6">
            Please enter your VebForge license key to activate this template on <span className="font-medium text-white">{domain}</span>
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive flex items-start gap-2">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-md bg-green-500/10 text-green-500 flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <p>License activated successfully! Loading template...</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Input
                placeholder="Enter your license key"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                className="bg-background border-gray-700 focus:border-primary"
                disabled={isVerifying || success}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={redirectToVerification}
                disabled={isVerifying || success}
                className="w-full border-gray-700 hover:bg-gray-800"
              >
                Get License
              </Button>
              <Button 
                onClick={handleActivation}
                disabled={isVerifying || success || !license.trim()}
                className="w-full"
              >
                {isVerifying ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Verifying...</span>
                  </div>
                ) : 'Activate'}
              </Button>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Your license key was provided with your purchase from Envato Market.
            If you need help, please contact support.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LicenseActivation;