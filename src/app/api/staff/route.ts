import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { staffQuerySchema } from '@/validation';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const { searchParams } = url;

    // Collecting parameters as strings
    const search = searchParams.get('search') || undefined;
    const page = searchParams.get('page') || undefined;
    const limit = searchParams.get('limit') || undefined;

    // Validate using safeParse
    const validationResult = staffQuerySchema.safeParse({
      search,
      page,
      limit,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.flatten();

      console.error('Validation Errors:', errors);

      // Return a 400 error response with error messages
      return NextResponse.json(
        {
          status: 400,
          message: 'Invalid query parameters',
          errors: {
            page: errors.fieldErrors.page || [],
            limit: errors.fieldErrors.limit || [],
          },
        },
        { status: 400 } // Set the response status to 400
      );
    }

    const {
      search: validatedSearch,
      page: validatedPage,
      limit: validatedLimit,
    } = validationResult.data;

    const offset = (validatedPage - 1) * validatedLimit; // Calculate offset

    // Create a filter based on the search parameter
    const searchFilter: Prisma.StaffWhereInput = validatedSearch
      ? {
          OR: [
            { username: { contains: validatedSearch, mode: 'insensitive' } }, // Filter by username
            { name: { contains: validatedSearch, mode: 'insensitive' } }, // Filter by name
            { email: { contains: validatedSearch, mode: 'insensitive' } }, // Filter by email
            { nip: { contains: validatedSearch } }, // Filter by nip
          ],
        }
      : {}; // Always provide an empty object for non-search cases

    // Fetch the staff data and the total count in one request using transactions
    const [staffs, totalCount] = await prisma.$transaction([
      prisma.staff.findMany({
        where: searchFilter, // Apply the search filter
        skip: offset, // Pagination offset
        take: validatedLimit, // Limit for pagination
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
        where: searchFilter, // Count the total matching records
      }),
    ]);

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        staffs,
        totalPages: Math.ceil(totalCount / validatedLimit), // Calculate total pages for pagination
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
