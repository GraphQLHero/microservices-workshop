'use client';
import { useEffect, useState } from 'react';
import { Card, Grid, Text } from '@tremor/react';
import fetchApiGateway from '../fetchApiGateway';
import Top from './Top';

export default function DisplayTopSearch() {
  const [data, setData] = useState<{
    topSearch: { country: string; value: number; percentage: number }[];
    viewer: {
      topSearch: { country: string; value: number; percentage: number }[];
    } | null;
  } | null>(null);

  const getViewer = async () => {
    // TODO add TS types on GraphQL frontend
    const data = await fetchApiGateway(
      /* GraphQL */
      `
        query {
          topSearch {
            country
            value
            percentage
          }
          viewer {
            topSearch {
              country
              value
              percentage
            }
          }
        }
      `
    );
    setData(data);
  };

  useEffect(() => {
    getViewer();
  }, []);

  return (
    <Grid numColsSm={2} numColsLg={3} className="gap-6">
      <Card>
        <Text>Votre Top</Text>
        {data?.viewer?.topSearch ? (
          <Top items={data?.viewer?.topSearch} />
        ) : (
          <Text>{`Vous n'avez pas encore de top`}</Text>
        )}
      </Card>
      <Card>
        <Text>Top Mondial</Text>
        {data?.topSearch ? (
          <Top items={data?.topSearch} />
        ) : (
          <Text>Chargement…</Text>
        )}
      </Card>
    </Grid>
  );
}
