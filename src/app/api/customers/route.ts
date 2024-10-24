import { NextRequest, NextResponse } from 'next/server';
import { searchQuerySchema } from '@/validation/schemas';
import CustomersServive from '@/services/customers';
import schemaValidator from '@/validation/validator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const validatedSearchQuery = schemaValidator(
      searchQuerySchema,
      searchParams
    );

    const {
      search: validatedSearch,
      page: validatedPage,
      limit: validatedLimit,
    } = validatedSearchQuery.data;

    const { customers, totalPages } = await CustomersServive.getAllCustomers(
      validatedPage,
      validatedLimit,
      validatedSearch
    );

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        customers,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching customer: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch customer data',
    });
  }
}
