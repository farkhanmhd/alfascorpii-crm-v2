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

    const searchFilter: Prisma.Hari_BesarWhereInput = validatedSearch
      ? {
          OR: [
            { hari_besar: { contains: validatedSearch, mode: 'insensitive' } },
            { agama: { contains: validatedSearch, mode: 'insensitive' } },
            { ucapan: { contains: validatedSearch, mode: 'insensitive' } },
            { status: { contains: validatedSearch, mode: 'insensitive' } },
          ],
        }
      : {};

    const [hariBesar, totalCount] = await prisma.$transaction([
      prisma.hari_Besar.findMany({
        where: searchFilter,
        skip: offset,
        take: validatedLimit,
        select: {
          id: true,
          hari_besar: true,
          tanggal: true,
          agama: true,
          ucapan: true,
          status: true,
        },
      }),
      prisma.hari_Besar.count({
        where: searchFilter,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        hariBesar,
        totalPages: Math.ceil(totalCount / validatedLimit),
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
