import { NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';

export async function POST(request: Request) {
  // TODO let's save/get a user to the database from the body
  // const body = await request.json();

  const token = jsonwebtoken.sign(
    {
      sub: '1234567890',
      name: 'John Doe',
      admin: true,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '3h' }
  );

  return NextResponse.json({ token });
}
