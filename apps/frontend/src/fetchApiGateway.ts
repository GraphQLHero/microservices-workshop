export default async function fetchApiGateway(
  graphqlQuery: string
): Promise<any> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/graphql`,
    {
      method: 'POST',
      credentials: 'include',
      body: graphqlQuery,
      headers: {
        Accept: `application/json`,
        'Content-Type': 'application/graphql',
      },
    }
  );
  const data = await response.json();

  return data?.data ?? null;
}
