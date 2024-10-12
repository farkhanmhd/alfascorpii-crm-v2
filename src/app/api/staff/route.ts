import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const { searchParams } = url;

    // Retrieve search parameters
    const search = searchParams.get('search') || ''; // Get the search term
    const page = Number(searchParams.get('page') || 1); // Get the current page
    const limit = Number(searchParams.get('limit') || 10); // Get the limit

    const offset = (page - 1) * limit; // Calculate offset

    // Create a filter based on the search parameter
    const searchFilter: Prisma.StaffWhereInput = search
      ? {
          OR: [
            { username: { contains: search, mode: 'insensitive' } }, // Filter by username
            { name: { contains: search, mode: 'insensitive' } }, // Filter by name
            { email: { contains: search, mode: 'insensitive' } }, // Filter by email
            { nip: { contains: search } }, // Filter by nip
          ],
        }
      : {}; // Always provide an empty object for non-search cases

    // Fetch the staff data and the total count in one request using transactions
    const [staff, totalCount] = await prisma.$transaction([
      prisma.staff.findMany({
        where: searchFilter, // Apply the search filter
        skip: offset, // Pagination offset
        take: limit, // Limit for pagination
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
        staff,
        totalPages: Math.ceil(totalCount / limit), // Calculate total pages for pagination
      },
    });
  } catch (error) {
    console.error('Error fetching staff: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch staff data',
    });
  }
}
