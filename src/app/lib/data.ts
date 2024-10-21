import { searchQuerySchema } from '@/validation';
import { notFound } from 'next/navigation';

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

export const fetchStaff = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('staff', queryParams);
};

export const fetchDealer = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('dealer', queryParams);
};

export const fetchCustomer = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('customers', queryParams);
};

export const fetchKerabat = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('customers/kerabat', queryParams);
};

export const fetchPekerjaan = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('customers/pekerjaan', queryParams);
};
export const fetchPendidikan = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('customers/pendidikan', queryParams);
};

export const fetchPengeluaran = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('customers/pengeluaran', queryParams);
};

export const fetchPenghasilan = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('customers/penghasilan', queryParams);
};

export const fetchHobi = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('customers/hobi', queryParams);
};

export const fetchStatusRumah = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('customers/status-rumah', queryParams);
};

export const fetchLeasing = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('leasing', queryParams);
};

export const fetchModel = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('model', queryParams);
};

export const fetchHariBesar = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('hari-besar', queryParams);
};

export const fetchMetodeFU = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('metode-fu', queryParams);
};

export const fetchKeteranganFU = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('keterangan-fu', queryParams);
};

export const fetchKeteranganHasil = async (
  search: string = '',
  page: string = '1',
  limit: string = '20'
) => {
  const validatedParams = validateQuery(searchQuerySchema, {
    search,
    page,
    limit,
  });
  const queryParams = searchQueryParams(validatedParams);
  return fetchData('keterangan-hasil', queryParams);
};

export const postPekerjaan = async ({
  pekerjaan,
  kode,
}: {
  pekerjaan: string;
  kode: string;
}) => {
  await fetch(
    `${process.env.API_URL || 'http://localhost:3000'}/api/customers/pekerjaan`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pekerjaan,
        kode,
      }),
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to post pekerjaan');
    }
  });
};

export const putPekerjaan = async (
  id: string,
  pekerjaan: string,
  kode: string,
  status: string
) => {
  await fetch(
    `${process.env.API_URL || 'http://localhost:3000'}/api/customers/pekerjaan`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        pekerjaan,
        kode,
        status,
      }),
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error('Failed to put pekerjaan');
    }
  });
};
