import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  console.log({ params });
  const json = [
    {
      country: 'FR',
      value: 5,
      percentage: 50,
    },
    {
      country: 'IT',
      value: 3,
      percentage: 30,
    },
  ];
  return NextResponse.json(json);
}
