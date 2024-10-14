import { staffQuerySchema } from '@/validation'; // Assuming the schema is in this path
import { notFound } from 'next/navigation';

export const fetchStaff = async (
  search: string = '',
  page: string = '1',
  limit: string = '10'
) => {
  const validationResult = staffQuerySchema.safeParse({
    search,
    page,
    limit,
  });

  if (!validationResult.success) {
    const errors = validationResult.error.flatten();
    console.error('Validation Errors:', errors);
    notFound();
  }

  const validatedParams = validationResult.data;

  const queryParams = new URLSearchParams();
  queryParams.set('page', validatedParams.page.toString());
  queryParams.set('limit', validatedParams.limit.toString());

  if (validatedParams.search) {
    queryParams.set('search', validatedParams.search);
  }

  const res = await fetch(
    `${process.env.API_URL || 'http://localhost:3000'}/api/staff?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    return {
      status: res.status,
      message: res.statusText,
    };
  }

  const { data } = await res.json();

  return data;
};
