import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { searchQuerySchema } from '@/validation';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const { searchParams } = url;

    const search = searchParams.get('search') || undefined;
    const page = searchParams.get('page') || undefined;
    const limit = searchParams.get('limit') || undefined;

    const validationResult = searchQuerySchema.safeParse({
      search,
      page,
      limit,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.flatten();

      console.error('Validation Errors:', errors);

      return NextResponse.json(
        {
          status: 400,
          message: 'Invalid query parameters',
          errors: {
            page: errors.fieldErrors.page || [],
            limit: errors.fieldErrors.limit || [],
          },
        },
        { status: 400 }
      );
    }

    const {
      search: validatedSearch,
      page: validatedPage,
      limit: validatedLimit,
    } = validationResult.data;

    const offset = (validatedPage - 1) * validatedLimit;

    const searchFilter: Prisma.CustomerWhereInput = validatedSearch
      ? {
          OR: [
            { dealer: { contains: validatedSearch, mode: 'insensitive' } },
            { name: { contains: validatedSearch, mode: 'insensitive' } },
            { lokasi: { contains: validatedSearch, mode: 'insensitive' } },
            { phone: { contains: validatedSearch, mode: 'insensitive' } },
            { motor: { contains: validatedSearch, mode: 'insensitive' } },
          ],
        }
      : {};

    const [customers, totalCount] = await prisma.$transaction([
      prisma.customer.findMany({
        where: searchFilter,
        skip: offset,
        take: validatedLimit,
        select: {
          id: true,
          dealer: true,
          name: true,
          lokasi: true,
          phone: true,
          follow_up: true,
        },
      }),
      prisma.customer.count({
        where: searchFilter,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        customers,
        totalPages: Math.ceil(totalCount / validatedLimit),
      },
    });
  } catch (error) {
    console.error('Error fetching customer: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch customer data',
    });
  } finally {
    await prisma.$disconnect();
  }
}
