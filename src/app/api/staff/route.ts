import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get the search parameter from the query string
    const { search } = Object.fromEntries(new URL(request.url).searchParams);

    // Build the query based on whether search is provided
    const staff = await prisma.staff.findMany({
      where: search
        ? {
            OR: [
              { username: { contains: search, mode: 'insensitive' } }, // Search by username
              { name: { contains: search, mode: 'insensitive' } }, // Search by name
              { email: { contains: search, mode: 'insensitive' } }, // Search by email
              { nip: { contains: search } }, // Search by nip
            ],
          }
        : {}, // If no search is provided, return all staff
    });

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: staff,
    });
  } catch (error) {
    console.error('Error fetching staff: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch staff data',
    });
  }
}
