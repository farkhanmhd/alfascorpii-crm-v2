export const fetchStaff = async (
  search: string = '',
  page: number = 1,
  limit: number = 10
) => {
  // Initialize the query string
  const queryParams = new URLSearchParams();

  // Always add limit and page to the query
  queryParams.set('page', page.toString());
  queryParams.set('limit', limit.toString());

  // If there's a search term, add it to the query parameters
  if (search) {
    queryParams.set('search', search);
  }

  const res = await fetch(
    `${process.env.API_URL}/api/staff?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch staff data');
  }

  const { data } = await res.json();
  return data;
};
