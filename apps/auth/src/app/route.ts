import { redirect } from 'next/navigation';

export async function GET() {
  redirect(
    'https://microservices-workshop.readme.io/reference/post_authentication'
  );
}
