import { fetchWithParams } from '../../fetchUtils';

export const fetchPekerjaan = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('customerjobs', search, page, per_page);

export const postPekerjaan = async ({
  pekerjaan,
  kode,
}: {
  pekerjaan: string;
  kode: string;
}) => {
  await fetch(
    `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/customers/pekerjaan`,
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
    `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/customers/pekerjaan`,
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

export const deletePekerjaan = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/customers/pekerjaan?id=${id}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete pekerjaan');
  }
};
