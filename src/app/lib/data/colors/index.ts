import { getAccessToken } from '../auth';

export const getColorOpts = async () => {
  const token = await getAccessToken();
  const res = await fetch(`${process.env.BACKEND_URL}/colors`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { data } = await res.json();

  const { color } = data;

  const options = color.map((option: any) => {
    return {
      label: option.color_name,
      value: String(option.id),
    };
  });

  return options;
};
