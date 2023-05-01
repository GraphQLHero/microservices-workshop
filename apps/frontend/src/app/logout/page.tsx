'use client';
import fetchApiGateway from '../../fetchApiGateway';
import { useEffect } from 'react';

export default function Logout() {
  const logout = async () => {
    const data = await fetchApiGateway(
      /* GraphQL */
      `
        mutation {
          logout(input: {}) {
            errorCode
          }
        }
      `
    );
    if (data?.logout?.errorCode) {
      alert(data.logout.errorCode);
      return;
    }
    window.location.href = '/';
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Bye
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
