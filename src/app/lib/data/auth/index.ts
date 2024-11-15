import { cookies } from 'next/headers';
import { decryptToken } from '../../actions/auth/session';

const getAccessToken = async () => {
  const cookieStore = await cookies();
  const encryptedToken = cookieStore.get('at')?.value;
  const accessToken = decryptToken(encryptedToken as string);

  return accessToken;
};

export default getAccessToken;
