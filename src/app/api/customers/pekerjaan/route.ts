import { NextRequest, NextResponse } from 'next/server';
import { searchQuerySchema, pekerjaanSchema } from '@/validation/schemas';
import schemaValidator from '@/validation/validator';
import PekerjaanService from '@/services/customers/pekerjaan';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
    };

    const validatedSearchQuery = schemaValidator(searchQuerySchema, params);

    const {
      search: validatedSearch,
      page: validatedPage,
      limit: validatedLimit,
    } = validatedSearchQuery.data;

    const { pekerjaan, totalPages } = await PekerjaanService.getListPekerjaan(
      validatedPage,
      validatedLimit,
      validatedSearch
    );

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: {
        pekerjaan,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching pekerjaan: ', error);
    return NextResponse.json({
      status: 500,
      message: 'Failed to fetch pekerjaan data',
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedBody = schemaValidator(pekerjaanSchema, body);

    const { pekerjaan, kode } = validatedBody.data;

    const newPekerjaan = await PekerjaanService.createNewPekerjaan(
      pekerjaan,
      kode
    );

    return NextResponse.json({
      status: 200,
      message: 'Success',
      data: newPekerjaan,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Failed to create pekerjaan',
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedBody = schemaValidator(pekerjaanSchema, body);

    const { id, pekerjaan, kode, status } = validatedBody.data;

    const updatedPekerjaan = await PekerjaanService.updatePekerjaan(
      id,
      pekerjaan,
      kode,
      status
    );

    return NextResponse.json(
      {
        message: 'Success',
        data: updatedPekerjaan,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Server Error',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          message: 'ID is required',
        },
        { status: 400 }
      );
    }

    await PekerjaanService.deletePekerjaan(id);

    return NextResponse.json(
      {
        message: 'Success',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Server Error',
      },
      { status: 500 }
    );
  }
}
