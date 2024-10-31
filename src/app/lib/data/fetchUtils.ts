import { notFound } from 'next/navigation';
import { searchQuerySchema } from '@/validation/schemas';
import { SearchQueryParams } from '@/types';
import { cookies } from 'next/headers';

const validateSearchQuery = (
  schema: typeof searchQuerySchema,
  params: SearchQueryParams
) => {
  const validationResult = schema.safeParse(params);
  if (!validationResult.success) {
    notFound();
  }
  return validationResult.data;
};

const createQueryParams = (params: {
  search?: string;
  page: number;
  per_page: number;
}) => {
  const queryParams = new URLSearchParams();
  queryParams.set('page', String(params.page));
  queryParams.set('per_page', String(params.per_page));
  if (params.search) {
    queryParams.set('search', params.search);
  }
  return queryParams;
};

interface FetchSearchParams {
  endpoint: string;
  params?: SearchQueryParams;
  method?: string;
  body?: object | null;
}

export const fetchSearch = async ({
  endpoint,
  params = {},
  method = 'GET',
  body = null,
}: FetchSearchParams) => {
  const validatedParams = validateSearchQuery(searchQuerySchema, params);
  const queryParams = createQueryParams(validatedParams) || '';
  const fetchUrl = `${process.env.BACKEND_URL}/${endpoint}${queryParams ? `?${queryParams.toString()}` : ''}`;
  const cookieStore = await cookies();
  const token = cookieStore.get('at');

  const res = await fetch(fetchUrl, {
    cache: 'force-cache',
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    notFound();
  }

  const { data } = await res.json();
  return data;
};

interface FetchData {
  endpoint: string;
  method?: string;
  body?: object | null;
}

export const fetchData = async ({
  endpoint,
  method = 'GET',
  body = null,
}: FetchData) => {
  const fetchUrl = `${process.env.BACKEND_URL}/${endpoint}`;
  const cookieStore = await cookies();
  const token = cookieStore.get('at');

  const res = await fetch(fetchUrl, {
    cache: 'force-cache',
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`,
    },
    body: body ? JSON.stringify(body) : null,
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
  per_page: string = '20'
) => {
  return fetchSearch({ endpoint, params: { search, page, per_page } });
};
