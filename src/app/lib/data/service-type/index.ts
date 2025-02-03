import { getAccessToken } from '../auth';

export const getServiceTypes = async () => {
  const token = await getAccessToken();
  const response = await fetch(`${process.env.BACKEND_URL}/servicetypes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data } = await response.json();
  const { serviceTypes } = data;

  const options = serviceTypes.map((option: any) => {
    return {
      label: option.service_name,
      value: String(option.id),
    };
  });

  return options;
};
