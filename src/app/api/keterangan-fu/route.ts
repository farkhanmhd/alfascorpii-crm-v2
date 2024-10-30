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
        take: validatedper_page,
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
        totalPages: Math.ceil(totalCount / validatedper_page),
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
