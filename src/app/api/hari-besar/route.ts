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

    const searchFilter: Prisma.holiday_nameWhereInput = validatedSearch
      ? {
          OR: [
            {
              holiday_name: { contains: validatedSearch, mode: 'insensitive' },
            },
            { agama: { contains: validatedSearch, mode: 'insensitive' } },
            { ucapan: { contains: validatedSearch, mode: 'insensitive' } },
            { status: { contains: validatedSearch, mode: 'insensitive' } },
          ],
        }
      : {};

    const [hariBesar, totalCount] = await prisma.$transaction([
      prisma.holiday_name.findMany({
        where: searchFilter,
        skip: offset,
        take: validatedper_page,
        select: {
          id: true,
          holiday_name: true,
          tanggal: true,
          agama: true,
          ucapan: true,
          status: true,
        },
      }),
      prisma.holiday_name.count({
        where: searchFilter,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        hariBesar,
        totalPages: Math.ceil(totalCount / validatedper_page),
      },
    });
  } catch (error) {
    console.error('Error fetching Hari Besar: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch Hari Besar data',
    });
  } finally {
    await prisma.$disconnect();
  }
}
