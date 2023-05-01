import { NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';

export async function POST(request: Request) {
  const body = (await request.json()) as { token: string };

  console.log({ body });
  try {
    const token = body.token;
    console.log({ token });
    const decoded = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    );
    console.log({ decoded });
    return NextResponse.json({ decoded });
  } catch (error) {
    console.error(error);
    return new NextResponse('', { status: 401 });
  }
}
