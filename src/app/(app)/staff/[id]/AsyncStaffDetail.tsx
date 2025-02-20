import React from 'react';
import { getUserData } from '@/app/lib/data/staff';
import StaffDetail from './StaffDetail';

const AsyncStaffDetail = async ({ id }: { id: string }) => {
  const data = await getUserData(id);

  return <StaffDetail profile={data} />;
};

export default AsyncStaffDetail;
