import { NextResponse } from 'next/server';
import jsonwebtoken from 'jsonwebtoken';
import { components } from '../../__generated__/openapi';

type VerifyInput = components['schemas']['VerifyInput'];
type VerifyPayload = components['schemas']['VerifyPayload'];
type AuthenticatedUserJwt = components['schemas']['AuthenticatedUserJwt'];

export async function POST(request: Request) {
  const body = (await request.json()) as VerifyInput;
  const token = body.token;

  if (!token) {
    return new NextResponse(`Invalid token`, { status: 401 });
  }

  try {
    const decoded = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthenticatedUserJwt;
    console.log({ decoded });

    const payload: VerifyPayload = { decoded };
    return NextResponse.json(payload);
  } catch (error) {
    console.error(error);
    return new NextResponse(`Invalid token`, { status: 401 });
  }
}
