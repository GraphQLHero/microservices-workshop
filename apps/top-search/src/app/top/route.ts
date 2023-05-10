import { NextResponse } from 'next/server';

export async function GET() {
  const json = [
    {
      country: 'FR',
      value: 10,
      percentage: 30,
    },
    {
      country: 'IT',
      value: 20,
      percentage: 70,
    },
  ];
  return NextResponse.json(json);
}
