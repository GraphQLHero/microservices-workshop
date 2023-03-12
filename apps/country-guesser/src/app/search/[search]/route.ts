import { NextResponse } from 'next/server';
import searchWithOpenAi from '../../../search/searchWithOpenAI';

export async function GET(
  request: Request,
  { params }: { params: { search: string } }
) {
  const search = params.search;
  const value = await searchWithOpenAi(search);
  return NextResponse.json({ search, value });
}
