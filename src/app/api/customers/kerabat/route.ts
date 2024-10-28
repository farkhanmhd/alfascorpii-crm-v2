import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { searchQuerySchema } from '@/validation/schemas';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const { searchParams } = url;

    const search = searchParams.get('search') || undefined;
    const page = searchParams.get('page') || undefined;
    const per_page = searchParams.get('per_page') || undefined;

    const validationResult = searchQuerySchema.safeParse({
      search,
      page,
      per_page,
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
            per_page: errors.fieldErrors.per_page || [],
          },
        },
        { status: 400 }
      );
    }

    const {
      search: validatedSearch,
      page: validatedPage,
      per_page: validatedper_page,
    } = validationResult.data;

    const offset = (validatedPage - 1) * validatedper_page;

    const searchFilter: Prisma.KerabatWhereInput = validatedSearch
      ? {
          OR: [{ kerabat: { contains: validatedSearch, mode: 'insensitive' } }],
        }
      : {};

    const [kerabat, totalCount] = await prisma.$transaction([
      prisma.kerabat.findMany({
        where: searchFilter,
        skip: offset,
        take: validatedper_page,
        select: {
          id: true,
          kerabat: true,
          status: true,
        },
      }),
      prisma.kerabat.count({
        where: searchFilter,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        kerabat,
        totalPages: Math.ceil(totalCount / validatedper_page),
      },
    });
  } catch (error) {
    console.error('Error fetching kerabat: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch kerabat data',
    });
  } finally {
    await prisma.$disconnect();
  }
}
