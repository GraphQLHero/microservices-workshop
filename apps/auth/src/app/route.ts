import path from 'path';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';

export async function GET() {
  const content = await fs.readFile(path.resolve('./src/openapi.yaml'), 'utf8');
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/yaml',
    },
  });
}
