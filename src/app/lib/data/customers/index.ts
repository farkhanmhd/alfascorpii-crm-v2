// export const fetchCustomer = (
//   search?: string,
//   page?: string,
//   per_page?: string
// ) => fetchWithParams('customers', search, page, per_page);
// import { fetchWithParams } from '@/app/lib/data/fetchUtils';
import { Prisma, Customer, Dealer, CustomerDealer } from '@prisma/client';
import { unstable_cache as cache } from 'next/cache';
import prisma from '@/prisma';

interface JoinedDealer extends Partial<CustomerDealer> {
  dealer: Partial<Dealer>;
}

export interface CustomerPage extends Partial<Customer> {
  customerDealer: JoinedDealer | null;
}

export const getCustomers = cache(
  async ({
    searchQuery,
    page = 1,
    perPage = 20,
  }: {
    searchQuery: string;
    page?: number;
    perPage?: number;
  }): Promise<{
    data: CustomerPage[];
    totalPages: number;
    currentPage: number;
  }> => {
    // Define the base filter
    const whereFilter: Prisma.CustomerWhereInput | undefined = searchQuery
      ? {
          OR: [
            { name: { contains: searchQuery, mode: 'insensitive' } },
            { phoneNumber: { contains: searchQuery, mode: 'insensitive' } },
            { address: { contains: searchQuery, mode: 'insensitive' } },
            {
              customerDealer: {
                dealer: {
                  OR: [
                    {
                      dealerName: {
                        contains: searchQuery,
                        mode: 'insensitive',
                      },
                    },
                    {
                      dealerCode: {
                        contains: searchQuery,
                        mode: 'insensitive',
                      },
                    },
                  ],
                },
              },
            },
          ],
        }
      : undefined;

    // Perform both queries simultaneously
    const [customers, totalRecords] = await Promise.all([
      prisma.customer.findMany({
        where: whereFilter,
        select: {
          id: true,
          name: true,
          district: true,
          city: true,
          address: true,
          phoneNumber: true,
          customerDealer: {
            select: {
              dealer: {
                select: {
                  dealerCode: true,
                  dealerName: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (Number(page) - 1) * Number(perPage),
        take: Number(perPage),
      }),
      prisma.customer.count({
        where: whereFilter, // Same filter applied as in `findMany`
      }),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / perPage);

    return {
      data: customers,
      totalPages,
      currentPage: page,
    };
  },
  ['customerspage'],
  { tags: ['customerspage'] }
);
