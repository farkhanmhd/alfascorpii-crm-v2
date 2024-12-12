import { eq, like, or } from 'drizzle-orm';
import { fetchWithParams, fetchData } from '@/app/lib/data/fetchUtils';
import db from '@/db';
import { customersTable, personsTable } from '@/db/schema';
import { getAccessToken } from '../auth';

export const fetchCustomer = (
  search?: string,
  page?: string,
  per_page?: string
) => fetchWithParams('customers', search, page, per_page);

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

export const getCustomer = async (id: number | string) => {
  return fetchData({
    endpoint: `customers/${id}`,
    method: 'GET',
    cache: 'no-cache',
  });
};

export const getCustomers = async (
  search?: string,
  page?: string,
  per_page?: string
) => {
  const customers = await db
    .select()
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
            like(personsTable.district, `%${search}%`),
            like(personsTable.cityOrRegency, `%${search}%`),
            like(personsTable.province, `%${search}%`)
          )
        : undefined // If `search` is undefined, do not apply any filter
    )
    .limit(per_page ? Number(per_page) : 50)
    .offset(page && per_page ? (Number(page) - 1) * Number(per_page) : 0);

  const flattenedCustomers = customers.map((record) => ({
    id: record.Customers.id,
    nik: record.Persons.nik,
    name: record.Persons.name,
    dateOfBirth: record.Persons.dateOfBirth,
    phoneNumber: record.Persons.phoneNumber,
    address: record.Persons.address,
    email: record.Persons.email,
    whatsapp: record.Persons.whatsapp,
    instagram: record.Persons.instagram,
    facebook: record.Persons.facebook,
    subDistrict: record.Persons.subDistrict,
    district: record.Persons.district,
    cityOrRegency: record.Persons.cityOrRegency,
    province: record.Persons.province,
  }));

  return flattenedCustomers;
};
