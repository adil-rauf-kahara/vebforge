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
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

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
        await saveLicenseToStorage(license, domain);
        
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
  window.open(
    `https://license.vebtual.com/verify?domain=${encodeURIComponent(domain)}`,
    '_blank',            // open in a new tab
    'noopener,noreferrer'// keep the new page from accessing window.opener
  );
};

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black/0 backdrop-blur-sm z-50 p-4 transition-all duration-300 ${animateIn ? 'bg-black/90 backdrop-blur-md' : ''}`}>
      <Card className={`max-w-md w-full bg-[#0f0f0f] border border-gray-800 shadow-2xl transition-all duration-500 transform ${animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
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
  Already purchased the template? Click <span className="font-semibold">Get&nbsp;License</span> and
  enter your Envato purchase code to receive your Vebforge license.
</p>

        </div>
      </Card>
    </div>
  );
};

export default LicenseActivation;