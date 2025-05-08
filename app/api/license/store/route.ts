import { writeFile, readFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { AES, enc } from 'crypto-js';

const ENCRYPTION_KEY = 'vebforge_license_key_2025';
const LICENSE_FILE_PATH = path.join(process.cwd(), '.license');

// Encrypt the license data for secure storage
const encryptData = (data: any): string => {
  return AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

// Ensure the license directory exists
async function ensureLicenseDirectory() {
  try {
    await mkdir(path.dirname(LICENSE_FILE_PATH), { recursive: true });
  } catch (error) {
    console.error('Error creating license directory:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { license, domain } = body;
    
    // Validate required fields
    if (!license || !domain) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Ensure directory exists
    await ensureLicenseDirectory();
    
    // Encrypt license data
    const licenseData = { license, domain, timestamp: Date.now() };
    const encryptedData = encryptData(licenseData);
    
    // Write to file
    await writeFile(LICENSE_FILE_PATH, encryptedData);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing license:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to store license' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Read the license file
    const encryptedData = await readFile(LICENSE_FILE_PATH, 'utf-8');
    
    // The GET method doesn't expose the license data directly to client,
    // it only confirms that license data exists
    return NextResponse.json({ exists: true });
  } catch (error) {
    return NextResponse.json({ exists: false });
  }
}