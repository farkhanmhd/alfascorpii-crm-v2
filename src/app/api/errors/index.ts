import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const validationError = (error: ZodError) => {
  const errors = error.flatten();

  return NextResponse.json(
    {
      message: error.message,
      errors,
    },
    { status: 400 }
  );
};
