import {
  Prisma,
  Customer,
  Dealer,
  Hobby,
  Job,
  ReligiousHoliday,
  HouseOwnership,
  Income,
  Expense,
  Purchase,
  CustomerPurchases,
  PurchaseMotorcycle,
  Motorcycle,
  MotorcycleType,
} from '@prisma/client';
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
    rows: number;
    totalPages: number;
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
      rows: totalRecords,
      totalPages,
    };
  },
  ['customerspage'],
  { tags: ['customerspage'] }
);

interface JoinedJob {
  job: Partial<Job>;
}

interface JoinedHolidays {
  holiday: Partial<ReligiousHoliday>;
}

interface JoinedHouseOwnership {
  houseOwnership: Partial<HouseOwnership>;
}

interface JoinedHobby {
  hobby: Partial<Hobby>;
}

interface JoinedFinances {
  income: Partial<Income>;
  expense: Partial<Expense>;
}

export interface CustomerPageDetail extends Partial<Customer> {
  job: JoinedJob;
  holidays: JoinedHolidays[];
  houseOwnership: JoinedHouseOwnership;
  hobby: JoinedHobby;
  finances: JoinedFinances;
}

export const getCustomer = async (id: string): Promise<CustomerPageDetail> => {
  const customer = await prisma.customer.findUnique({
    select: {
      id: true,
      nik: true,
      name: true,
      phoneNumber: true,
      email: true,
      whatsapp: true,
      instagram: true,
      facebook: true,
      dateOfBirth: true,
      address: true,
      subDistrict: true,
      district: true,
      city: true,
      province: true,
      job: {
        select: {
          job: {
            select: {
              jobName: true,
            },
          },
        },
      },
      holidays: {
        select: {
          holiday: {
            select: {
              holidayName: true,
            },
          },
        },
      },
      houseOwnership: {
        select: {
          houseOwnership: {
            select: {
              ownershipStatus: true,
            },
          },
        },
      },
      hobby: {
        select: {
          hobby: {
            select: {
              hobbyName: true,
            },
          },
        },
      },
      finances: {
        select: {
          income: {
            select: {
              incomeDetail: true,
            },
          },
          expense: {
            select: {
              expenseDetail: true,
            },
          },
        },
      },
    },
    where: {
      id,
    },
  });

  return customer as CustomerPageDetail;
};

interface JoinedMotorcycleType extends Partial<MotorcycleType> {}

interface JoinedMotorcycle extends Partial<Motorcycle> {
  type: JoinedMotorcycleType;
}

interface JoinedMotorcycle extends Partial<PurchaseMotorcycle> {
  motorcycle: JoinedMotorcycle;
}

interface JoinedPurchase extends Partial<Purchase> {
  purchaseMotorcycles: JoinedMotorcycle[];
}

interface JoinedCustomerPurchases extends Partial<CustomerPurchases> {
  purchase: JoinedPurchase;
}

export interface CustomerMotorCycle extends Partial<Customer> {
  purchases: JoinedCustomerPurchases[];
}

export const getCustomerMotorcycle = async (
  customerId: string
): Promise<CustomerMotorCycle> => {
  const motorcycle = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
    select: {
      purchases: {
        select: {
          purchase: {
            select: {
              purchaseType: true,
              purchaseDate: true,
              purchaseMotorcycles: {
                select: {
                  motorcycle: {
                    select: {
                      chassisId: true,
                      engineId: true,
                      price: true,
                      type: {
                        select: {
                          motorcycleName: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return motorcycle as CustomerMotorCycle;
};
