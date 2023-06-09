import { NextRequest } from 'next/server';

import { SESSION_COOKIE } from '../config';
import { components } from '../__generated__/auth';

type VerifyInput = components['schemas']['VerifyInput'];
type VerifyPayload = components['schemas']['VerifyPayload'];
export type Viewer = components['schemas']['AuthenticatedUserJwt'];

export default async function getViewerFromRequest(
  request: NextRequest
): Promise<Viewer | null> {
  const jwt = request.cookies.get(SESSION_COOKIE)?.value;
  if (!jwt) {
    console.debug('No JWT found in cookies');
    return null;
  }

  const body: VerifyInput = { token: jwt };
  const response = await fetch(`${process.env.AUTH_URL}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (response.status === 401) {
    console.warn('Invalid JWT found in cookies');
    return null;
  }

  try {
    const data = (await response.json()) as VerifyPayload;
    return data?.decoded ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
