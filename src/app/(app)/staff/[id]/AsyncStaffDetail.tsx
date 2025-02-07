import React from 'react';
import { getUserData } from '@/app/lib/data/staff';
import StaffDetail from './StaffDetail';

const AsyncStaffDetail = async () => {
  const profile = await getUserData();

  return <StaffDetail profile={profile} />;
};

export default AsyncStaffDetail;
