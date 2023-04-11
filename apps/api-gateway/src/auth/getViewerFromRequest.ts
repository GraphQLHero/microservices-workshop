import { NextRequest } from 'next/server';

export type Viewer = {
  id: string;
  email: string;
  name: string;
  admin: boolean;
};

export default async function getViewerFromRequest(
  request: NextRequest
): Promise<Viewer | null> {
  const jwt = request.cookies.get('jwt');
  if (!jwt?.value) {
    console.info('No JWT found in cookies');
    return null;
  }

  const response = await fetch(`${process.env.AUTH_URL}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: jwt.value,
    }),
  });
  if (response.status === 401) {
    console.warn('Invalid JWT found in cookies');
    return null;
  }

  try {
    const data = await response.json();
    return data?.decoded ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
