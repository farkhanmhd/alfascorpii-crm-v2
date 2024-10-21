import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { searchQuerySchema, pekerjaanSchema } from '@/validation';

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

    const searchFilter: Prisma.PekerjaanWhereInput = validatedSearch
      ? {
          OR: [
            { pekerjaan: { contains: validatedSearch, mode: 'insensitive' } },
          ],
        }
      : {};

    const [pekerjaan, totalCount] = await prisma.$transaction([
      prisma.pekerjaan.findMany({
        where: searchFilter,
        skip: offset,
        take: validatedLimit,
        select: {
          id: true,
          pekerjaan: true,
          kode: true,
          status: true,
        },
        orderBy: {
          updated_at: 'desc',
        },
      }),
      prisma.pekerjaan.count({
        where: searchFilter,
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        pekerjaan,
        totalPages: Math.ceil(totalCount / validatedLimit),
      },
    });
  } catch (error) {
    console.error('Error fetching pekerjaan: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch pekerjaan data',
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = pekerjaanSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten();

      return NextResponse.json({
        status: 400,
        message: 'Invalid data',
        errors,
      });
    }

    const pekerjaan = await prisma.pekerjaan.create({
      data: body,
    });

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: pekerjaan,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Failed to create pekerjaan',
    });
  } finally {
    prisma.$disconnect();
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    const validationResult = pekerjaanSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.flatten();
      return NextResponse.json(
        {
          message: 'Invalid data',
          errors,
        },
        { status: 400 }
      );
    }

    const updatedPekerjaan = await prisma.pekerjaan.update({
      where: {
        id: body.id,
      },
      data: {
        id: body.id,
        pekerjaan: body.pekerjaan,
        kode: body.kode,
        status: body.status,
        updated_at: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: 'Success',
        data: updatedPekerjaan,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to update pekerjaan:', error);
    return NextResponse.json(
      {
        message: 'Failed to update pekerjaan',
      },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
}
