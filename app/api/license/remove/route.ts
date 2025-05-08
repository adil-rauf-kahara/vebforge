import { unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const LICENSE_FILE_PATH = path.join(process.cwd(), '.license');

export async function POST(request: NextRequest) {
  try {
    // Delete the license file
    await unlink(LICENSE_FILE_PATH);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing license file:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to remove license' },
      { status: 500 }
    );
  }
}