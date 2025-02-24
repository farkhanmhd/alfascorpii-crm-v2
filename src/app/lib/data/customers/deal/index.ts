import { DealType } from '@/types';
import { getAccessToken } from '../../auth';

export const importDealImage = async (
  id: string | number,
  file: File | undefined
) => {
  const accessToken = await getAccessToken();

  const url = `${process.env.API_URL}/deals/${id}/photos`;

  const formData = new FormData();
  formData.append('deal_photos[]', file as File);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const { meta } = await response.json();
  const { status, message } = meta;

  return { status, message };
};

export const postNewDeal = async (data: DealType) => {
  try {
    const accessToken = await getAccessToken();

    let url = '';

    if (data.deal_type === 'unit_nc') {
      url = `${process.env.API_URL}/deals`;
    } else {
      url = `${process.env.API_URL}/customers/${data.id}/adddeal`;
    }

    const payload = Object.fromEntries(
      Object.entries(data).filter(([key]) => key !== 'id' && key !== 'file')
    );

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const { meta, data: deal } = await response.json();
    const { message } = meta;

    if (data.file) {
      const imageRes = await importDealImage(deal.deal_id, data.file as File);

      const { message: imageMessage } = imageRes;

      return {
        status: 'success',
        message: `Deal: ${message} Image: ${imageMessage}`,
      };
    }

    return {
      status: 'success',
      message: 'Deal added successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Server Error: Failed to add Deal',
    };
  }
};

export const updateDealStatus = async (
  id: string,
  payload: { deal_status: string }
) => {
  try {
    const accessToken = await getAccessToken();

    const url = `${process.env.API_URL}/deals/${id}/updatestatus`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const { meta } = await response.json();
    const { status, message } = meta;

    return { status, message };
  } catch (error) {
    return {
      status: 'error',
      message: 'Server Error: Failed to Update Status',
    };
  }
};
