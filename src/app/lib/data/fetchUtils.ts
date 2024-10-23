import { notFound } from 'next/navigation';
import { searchQuerySchema } from '@/validation/schemas';
import { SearchQueryParams } from '@/types';

const validateSearchQuery = (
  schema: typeof searchQuerySchema,
  params: SearchQueryParams
) => {
  const validationResult = schema.safeParse(params);
  if (!validationResult.success) {
    throw new Error('Invalid query parameters');
  }
  return validationResult.data;
};

const createQueryParams = (params: {
  search?: string;
  page: number;
  limit: number;
}) => {
  const queryParams = new URLSearchParams();
  queryParams.set('page', String(params.page));
  queryParams.set('limit', String(params.limit));
  if (params.search) {
    queryParams.set('search', params.search);
  }
  return queryParams;
};

const fetchData = async (endpoint: string, params: SearchQueryParams) => {
  const validatedParams = validateSearchQuery(searchQuerySchema, params);
  const queryParams = createQueryParams(validatedParams);
  const fetchUrl = `${process.env.API_URL || 'http://localhost:3000'}/api/${endpoint}/?${queryParams.toString()}`;

  const res = await fetch(fetchUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    notFound();
  }

  const { data } = await res.json();
  return data;
};

export const fetchWithParams = async (
  endpoint: string,
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  return fetchData(endpoint, { search, page, limit });
};
