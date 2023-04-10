import { NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const token = body.token;
    const decoded = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );
    return NextResponse.json({ decoded });
  } catch (error) {
    return new NextResponse('', { status: 401 });
  }
}
