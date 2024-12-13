import React from 'react';
import { eq } from 'drizzle-orm';
import db from '@/db';
import { usersTable } from '@/db/schema';
import CroOptions from './CroOptions';

const CroList = async () => {
  const data = await db
    .select({ id: usersTable.id, name: usersTable.name })
    .from(usersTable)
    .where(eq(usersTable.role, 'CRO'));

  const options = data.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return <CroOptions options={options} />;
};

export default CroList;
