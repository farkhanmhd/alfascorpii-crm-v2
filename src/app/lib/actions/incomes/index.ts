'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { postIncome, putIncome, deleteIncome } from '../../data/incomes';

const incomeSchema = z.object({
  id: z.number(),
  income_upper_limit: z
    .number()
    .min(1, { message: 'Upper limit is required and greater than 0' }),
  income_lower_limit: z
    .number()
    .min(1, { message: 'Lower limit is required and greater than 0' }),
  income_detail: z.string().min(1, { message: 'Detail is required' }),
  income_code: z.string().min(1, { message: 'Code is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createIncomeSchema = incomeSchema.omit({ id: true });

export const addIncomeAction = actionClient
  .schema(createIncomeSchema)
  .action(
    async ({
      parsedInput: {
        income_upper_limit,
        income_lower_limit,
        income_detail,
        income_code,
        status,
      },
    }) => {
      try {
        if (income_upper_limit < income_lower_limit) {
          return {
            status: 'error',
            message: 'Batas Atas tidak boleh lebih kecil dari Batas Bawah',
          };
        }

        await postIncome(
          String(income_upper_limit),
          String(income_lower_limit),
          income_detail,
          income_code,
          status
        );
        revalidatePath('/incomes');
        return { status: 'success', message: 'Income added successfully' };
      } catch (error) {
        return {
          status: 'error',
          message: 'Server Error: Failed to add Income',
        };
      }
    }
  );

export const editIncomeAction = actionClient
  .schema(incomeSchema)
  .action(
    async ({
      parsedInput: {
        id,
        income_upper_limit,
        income_lower_limit,
        income_detail,
        income_code,
        status,
      },
    }) => {
      try {
        if (income_upper_limit < income_lower_limit) {
          return {
            status: 'error',
            message: 'Batas Atas tidak boleh lebih kecil dari Batas Bawah',
          };
        }
        await putIncome(
          id,
          String(income_upper_limit),
          String(income_lower_limit),
          income_detail,
          income_code,
          status
        );
        revalidatePath('/incomes');
        return { status: 'success', message: 'Income edited successfully' };
      } catch (error) {
        return {
          status: 'error',
          message: 'Server Error: Failed to edit Income',
        };
      }
    }
  );

const deleteIncomeSchema = z.object({
  id: z.number(),
});

export const removeIncomeAction = actionClient
  .schema(deleteIncomeSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteIncome(id);
      revalidatePath('/incomes');
      return { status: 'success', message: 'Income deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Income',
      };
    }
  });
