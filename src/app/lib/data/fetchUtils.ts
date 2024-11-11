import { notFound } from 'next/navigation';
import { searchQuerySchema } from '@/validation/schemas';
import { SearchQueryParams } from '@/types';
import { auth } from '@/auth';
import { getToken } from 'next-auth/jwt';

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
  const session = await auth();
  const accessToken = session?.accessToken;

  const res = await fetch(fetchUrl, {
    cache: 'force-cache',
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
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
  cache?:
    | 'default'
    | 'force-cache'
    | 'no-cache'
    | 'no-store'
    | 'only-if-cached'
    | 'reload';
}

export const fetchData = async ({
  endpoint,
  method = 'GET',
  body = null,
  cache = 'force-cache',
}: FetchData) => {
  const fetchUrl = `${process.env.BACKEND_URL}/${endpoint}`;
  const session = await auth();
  const accessToken = session?.accessToken;

  const res = await fetch(fetchUrl, {
    cache,
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
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
