import { dealerQuerySchema, staffQuerySchema } from '@/validation';
import { notFound } from 'next/navigation';

// Helper function to handle validation
const validateQuery = (
  schema: any,
  params: { search?: string; page?: string; limit?: string }
) => {
  const validationResult = schema.safeParse(params);
  if (!validationResult.success) {
    const errors = validationResult.error.flatten();
    console.error('Validation Errors:', errors);
    notFound();
  }
  return validationResult.data;
};

// Helper function to build query parameters
const searchQueryParams = (params: {
  search?: string;
  page: string;
  limit: string;
}) => {
  const queryParams = new URLSearchParams();
  queryParams.set('page', params.page);
  queryParams.set('limit', params.limit);
  if (params.search) {
    queryParams.set('search', params.search);
  }
  return queryParams;
};

// Helper function to fetch data
const fetchData = async (endpoint: string, queryParams: URLSearchParams) => {
  const res = await fetch(
    `${process.env.API_URL || 'http://localhost:3000'}/api/${endpoint}?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    notFound();
  }

  const { data } = await res.json();
  return data;
};

// Fetch Staff data
export const fetchStaff = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(staffQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('staff', queryParams);
};

// Fetch Dealer data
export const fetchDealer = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(dealerQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('dealer', queryParams);
};
