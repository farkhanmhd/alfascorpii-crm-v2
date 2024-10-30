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
      return NextResponse.json({
        status: 400,
        message: 'Invalid query parameters',
        errors: {
          page: errors.fieldErrors.page || [],
          per_page: errors.fieldErrors.per_page || [],
        },
      });
    }

    const {
      search: validatedSearch,
      page: validatedPage,
      per_page: validatedper_page,
    } = validationResult.data;

    const offset = (validatedPage - 1) * validatedper_page;

    const searchFilter: Prisma.DealerWhereInput = validatedSearch
      ? {
          OR: [
            { kode: { contains: validatedSearch, mode: 'insensitive' } },
            { nama: { contains: validatedSearch, mode: 'insensitive' } },
          ],
        }
      : {};

    const [dealers, totalCount] = await prisma.$transaction([
      prisma.dealer.findMany({
        where: searchFilter,
        skip: offset,
        take: validatedper_page,
        select: {
          id: true,
          kode: true,
          nama: true,
          status: true,
        },
      }),
      prisma.dealer.count({ where: searchFilter }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        dealers,
        totalPages: Math.ceil(totalCount / validatedper_page),
      },
    });
  } catch (error) {
    console.error('Error fetching dealer: ', error);
    return NextResponse.json(
      { error: 'Error fetching dealer' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
