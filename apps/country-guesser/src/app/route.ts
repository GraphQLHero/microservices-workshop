import { redirect } from 'next/navigation';

export async function GET() {
  redirect(
    'https://microservices-workshop.readme.io/reference/get_search-search'
  );
}
