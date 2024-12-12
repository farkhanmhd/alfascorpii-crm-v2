// import { unstable_cache as cache } from 'next/cache';
import { eq, like, or, count } from 'drizzle-orm';
// import {
//   // fetchWithParams,
//   fetchData,
// } from '@/app/lib/data/fetchUtils';
import db from '@/db';
import { customersTable, personsTable } from '@/db/schema';
import { getAccessToken } from '../auth';

// export const fetchCustomer = (
//   search?: string,
//   page?: string,
//   per_page?: string
// ) => fetchWithParams('customers', search, page, per_page);

export const importCustomer = async (file: File) => {
  const accessToken = await getAccessToken();
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${process.env.BACKEND_URL}/importdata`, {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const { message } = await response.json();
  return message;
};

// export const getCustomer = async (id: number | string) => {
//   return fetchData({
//     endpoint: `customers/${id}`,
//     method: 'GET',
//     cache: 'no-cache',
//   });
// };

export const getCustomer = async (id: string) => {
  const data = await db
    .select({
      id: customersTable.id,
      nik: personsTable.nik,
      name: personsTable.name,
      dateOfBirth: personsTable.dateOfBirth,
      phoneNumber: personsTable.phoneNumber,
      address: personsTable.address,
      subDistrict: personsTable.subDistrict,
      district: personsTable.district,
      cityOrRegency: personsTable.cityOrRegency,
      province: personsTable.province,
      email: personsTable.email,
      whatsapp: personsTable.whatsapp,
      instagram: personsTable.instagram,
      facebook: personsTable.facebook,
    })
    .from(customersTable)
    .innerJoin(personsTable, eq(customersTable.personId, personsTable.id))
    .where(eq(customersTable.id, id));
  const customer = data[0];
  return customer;
};

export const getCustomers = async (
  search?: string,
  page?: string,
  per_page?: string
) => {
  const pageNum = page ? Number(page) : 1;
  const perPageNum = per_page ? Number(per_page) : 50;
  const offsetValue = (pageNum - 1) * perPageNum;

  const customers = await db
    .select({
      id: customersTable.id,
      nik: personsTable.nik,
      name: personsTable.name,
      subDistrict: personsTable.subDistrict,
      district: personsTable.district,
      phoneNumber: personsTable.phoneNumber,
      address: personsTable.address,
    })
    .from(customersTable)
    .innerJoin(personsTable, eq(customersTable.personId, personsTable.id))
    .where(
      search
        ? or(
            like(personsTable.name, `%${search}%`),
            like(personsTable.nik, `%${search}%`),
            like(personsTable.phoneNumber, `%${search}%`),
            like(personsTable.address, `%${search}%`),
            like(personsTable.subDistrict, `%${search}%`),
            like(personsTable.district, `%${search}%`)
          )
        : undefined
    )
    .limit(perPageNum)
    .offset(offsetValue);

  const rows = await db
    .select({
      count: count(),
    })
    .from(customersTable)
    .innerJoin(personsTable, eq(customersTable.personId, personsTable.id))
    .where(
      search
        ? or(
            like(personsTable.name, `%${search}%`),
            like(personsTable.nik, `%${search}%`),
            like(personsTable.phoneNumber, `%${search}%`),
            like(personsTable.address, `%${search}%`),
            like(personsTable.subDistrict, `%${search}%`),
            like(personsTable.district, `%${search}%`)
          )
        : undefined
    );

  const totalRows = rows[0].count;
  const totalPages = Math.ceil(totalRows / perPageNum);

  return { customers, totalRows, totalPages };
};
