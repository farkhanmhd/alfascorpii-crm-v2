import { getAccessToken } from '../auth';

export const getDataSourceOpts = async () => {
  const accessToken = await getAccessToken();
  const url = `${process.env.BACKEND_URL}/datasources`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { data } = await response.json();
  const { data_sources: sources } = data;

  const options = sources.map((source: any) => ({
    label: source.data_source_name,
    value: source.id,
  }));

  return options;
};
