import crypto from 'crypto';
import { NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';
import { components } from '../../__generated__/openapi';

type AuthInput = components['schemas']['AuthInput'];
type AuthPayload = components['schemas']['AuthPayload'];

export async function POST(request: Request) {
  const body = (await request.json()) as AuthInput;

  // In a real application, do something to fetch the user
  if (!body.username || !body.password) {
    return new NextResponse(`Invalid credentials`, { status: 400 });
  }

  // Here we just generate a token for the given data
  const email = body.username;
  const token = jsonwebtoken.sign(
    {
      id: crypto.randomUUID(),
      name: email?.split('@')[0],
      email,
      admin: false,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '3h' }
  );

  const payload: AuthPayload = { token };
  return NextResponse.json(payload);
}
