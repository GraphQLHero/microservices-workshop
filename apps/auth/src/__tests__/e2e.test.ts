// import { loadEnvConfig } from '@next/env';
// loadEnvConfig(process.cwd());
import jsonwebtoken from 'jsonwebtoken';
import fetch from 'cross-fetch';

describe('e2e', () => {
  it('does not verify a random token', async () => {
    const response = await fetch(`${process.env.AUTH_URL}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: 'token' }),
    });
    expect(response.status).toEqual(401);
  });

  it('verify a real token', async () => {
    const token = jsonwebtoken.sign(
      {
        id: '1234567890',
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        admin: true,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '3h' }
    );

    const response = await fetch(`${process.env.AUTH_URL}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    expect(data).toEqual({
      decoded: {
        admin: true,
        email: 'johndoe@gmail.com',
        exp: expect.any(Number),
        iat: expect.any(Number),
        id: '1234567890',
        name: 'John Doe',
      },
    });
  });
});
