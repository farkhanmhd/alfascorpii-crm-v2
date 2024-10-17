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

    const searchFilter: Prisma.StaffWhereInput = validatedSearch
      ? {
          OR: [
            { username: { contains: validatedSearch, mode: 'insensitive' } },
            { name: { contains: validatedSearch, mode: 'insensitive' } },
            { email: { contains: validatedSearch, mode: 'insensitive' } },
            { nip: { contains: validatedSearch } },
          ],
        }
      : {};

    const [staffs, totalCount] = await prisma.$transaction([
      prisma.staff.findMany({
        where: searchFilter,
        skip: offset,
        take: validatedLimit,
        select: {
          id: true,
          nip: true,
          username: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      }),
      prisma.staff.count({
        where: searchFilter,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        staffs,
        totalPages: Math.ceil(totalCount / validatedLimit),
      },
    });
  } catch (error) {
    console.error('Error fetching staff: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch staff data',
    });
  } finally {
    await prisma.$disconnect();
  }
}
