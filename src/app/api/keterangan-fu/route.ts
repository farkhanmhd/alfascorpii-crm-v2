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

    const searchFilter: Prisma.Keterangan_FUWhereInput = validatedSearch
      ? {
          OR: [
            { keterangan: { contains: validatedSearch, mode: 'insensitive' } },
            {
              kategori_hasil: {
                contains: validatedSearch,
                mode: 'insensitive',
              },
            },
          ],
        }
      : {};

    const [keteranganFU, totalCount] = await prisma.$transaction([
      prisma.keterangan_FU.findMany({
        where: searchFilter,
        skip: offset,
        take: validatedLimit,
        select: {
          id: true,
          keterangan: true,
          kategori_hasil: true,
          status: true,
          tampil: true,
        },
      }),
      prisma.keterangan_FU.count({
        where: searchFilter,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        keteranganFU,
        totalPages: Math.ceil(totalCount / validatedLimit),
      },
    });
  } catch (error) {
    console.error('Error fetching Keterangan FU: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch Keterangan FU data',
    });
  } finally {
    await prisma.$disconnect();
  }
}
