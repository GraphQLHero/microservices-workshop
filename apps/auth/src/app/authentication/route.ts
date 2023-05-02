import crypto from 'crypto';
import { NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';

type AuthenticationBody = {
  username?: string;
  password?: string;
};

export async function POST(request: Request) {
  // TODO let's save/get a user to the database from the body
  const body = (await request.json()) as AuthenticationBody;
  console.log({ body });

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

  return NextResponse.json({ token });
}
