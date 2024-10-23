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

    const searchFilter: Prisma.Dpack_ModelWhereInput = validatedSearch
      ? {
          OR: [
            { model: { contains: validatedSearch, mode: 'insensitive' } },
            { catalog: { contains: validatedSearch, mode: 'insensitive' } },
            { category: { contains: validatedSearch, mode: 'insensitive' } },
            { color: { contains: validatedSearch, mode: 'insensitive' } },
          ],
        }
      : {};

    const [dpackModel, totalCount] = await prisma.$transaction([
      prisma.dpack_Model.findMany({
        where: searchFilter,
        skip: offset,
        take: validatedLimit,
        select: {
          id: true,
          model: true,
          catalog: true,
          category: true,
          color: true,
        },
      }),
      prisma.dpack_Model.count({
        where: searchFilter,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        dpackModel,
        totalPages: Math.ceil(totalCount / validatedLimit),
      },
    });
  } catch (error) {
    console.error('Error fetching DPack Model: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch Dpack Model data',
    });
  } finally {
    await prisma.$disconnect();
  }
}
