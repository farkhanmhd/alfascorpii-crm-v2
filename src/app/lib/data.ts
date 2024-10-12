export const fetchStaff = async (search: string = '') => {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  const res = await fetch(`${process.env.API_URL}/api/staff${query}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch staff data');
  }

  const { data } = await res.json();
  return data;
};
