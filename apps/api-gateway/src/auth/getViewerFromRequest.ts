import { NextRequest } from 'next/server';

type Viewer = {
  id: string;
};

export default async function getViewerFromRequest(
  request: NextRequest
): Promise<Viewer | null> {
  const jwt = request.cookies.get('jwt');
  if (!jwt) {
    return null;
  }

  const response = await fetch(`${process.env.AUTH_URL}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: jwt,
    }),
  });
  if (response.status === 401) {
    return null;
  }

  const data = await response.json();

  return data?.decoded ?? null;
}
