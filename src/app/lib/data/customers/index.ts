import { Prisma, Customer, Dealer } from '@prisma/client';
import { unstable_cache as cache } from 'next/cache';
import prisma from '@/prisma';

// Represents the nested dealer structure
interface JoinedDealer {
  dealer: Partial<Dealer>;
}

// Represents the nested purchase dealer structure
interface JoinedPurchaseDealer {
  purchaseDealers: JoinedDealer[];
}

// Represents the customer purchases structure
interface JoinedCustomerPurchase {
  purchase: JoinedPurchaseDealer;
}

// Represents the overall customer structure
export interface CustomerPage extends Partial<Customer> {
  purchases: JoinedCustomerPurchase[];
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
              purchases: {
                some: {
                  purchase: {
                    purchaseDealers: {
                      some: {
                        dealer: {
                          OR: [
                            {
                              dealerCode: {
                                contains: searchQuery,
                                mode: 'insensitive',
                              },
                            },
                            {
                              dealerName: {
                                contains: searchQuery,
                                mode: 'insensitive',
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
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
          purchases: {
            take: 1,
            select: {
              purchase: {
                select: {
                  purchaseDealers: {
                    orderBy: {
                      createdAt: 'desc',
                    },
                    take: 1,
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
