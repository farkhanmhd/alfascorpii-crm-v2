export const fetchStaff = async () => {
  const res = await fetch(`${process.env.API_URL}/api/staff`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { data } = await res.json();

  return data;
};
