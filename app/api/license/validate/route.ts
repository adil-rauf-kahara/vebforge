import { readFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { AES, enc } from 'crypto-js';

const ENCRYPTION_KEY = 'vebforge_license_key_2025';
const LICENSE_FILE_PATH = path.join(process.cwd(), '.license');
const LICENSE_API_ENDPOINT = 'https://mwnnuookrounjrcjqppm.supabase.co/functions/v1/validate-license';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13bm51b29rcm91bmpyY2pxcHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MDg2NTQsImV4cCI6MjA2MjE4NDY1NH0.cdsHXL6Bv6bMtMxuptUCiHVIwWKNUWzxZvCJyKhXTZk';

// Decrypt the stored license data
const decryptData = (ciphertext: string): any => {
  try {
    const bytes = AES.decrypt(ciphertext, ENCRYPTION_KEY);
    return JSON.parse(bytes.toString(enc.Utf8));
  } catch (error) {
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    // Get domain from the request
    const body = await request.json();
    const { domain } = body;
    
    if (!domain) {
      return NextResponse.json(
        { isValid: false, error: 'Domain is required' },
        { status: 400 }
      );
    }
    
    // Read the license file
    let licenseData;
    try {
      const fileData = await readFile(LICENSE_FILE_PATH, 'utf-8');
      licenseData = decryptData(fileData);
    } catch (error) {
      return NextResponse.json({ isValid: false, error: 'License not found' });
    }
    
    if (!licenseData || !licenseData.license) {
      return NextResponse.json({ isValid: false, error: 'Invalid license data' });
    }
    
    // Validate with the remote license server
    try {
      const response = await fetch(LICENSE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          licenseKey: licenseData.license,
          domain
        })
      });
      
      if (!response.ok) {
        return NextResponse.json({ isValid: false, error: 'License server error' });
      }
      
      const result = await response.json();
      return NextResponse.json({ isValid: result.success === true });
    } catch (error) {
      console.error('Error validating license with server:', error);
      
      // Fallback to local validation if server is unreachable
      // Is the domain in the license file the same as the requested domain?
      const isValid = licenseData.domain === domain;
      return NextResponse.json({ 
        isValid, 
        fromCache: true,
        message: 'Using cached license validation due to server error'
      });
    }
  } catch (error) {
    console.error('License validation error:', error);
    return NextResponse.json(
      { isValid: false, error: 'Validation failed' },
      { status: 500 }
    );
  }
}