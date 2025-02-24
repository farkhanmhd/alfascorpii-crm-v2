'use server';

import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import actionClient from '@/lib/safe-action';
import { postExpense, putExpense, deleteExpense } from '../../data/expenses';

const expenseSchema = z.object({
  id: z.number(),
  expense_upper_limit: z
    .number()
    .min(1, { message: 'Upper limit is required and greater than 0' }),
  expense_lower_limit: z
    .number()
    .min(1, { message: 'Lower limit is required and greater than 0' }),
  expense_detail: z.string().min(1, { message: 'Detail is required' }),
  expense_code: z.string().min(1, { message: 'Code is required' }),
  status: z.enum(['SHOW', 'HIDE']),
});

const createExpenseSchema = expenseSchema.omit({ id: true });

export const addExpenseAction = actionClient
  .schema(createExpenseSchema)
  .action(
    async ({
      parsedInput: {
        expense_upper_limit,
        expense_lower_limit,
        expense_detail,
        expense_code,
        status,
      },
    }) => {
      try {
        if (expense_upper_limit < expense_lower_limit) {
          return {
            status: 'error',
            message: 'Batas Atas tidak boleh lebih kecil dari Batas Bawah',
          };
        }

        await postExpense(
          String(expense_upper_limit),
          String(expense_lower_limit),
          expense_detail,
          expense_code,
          status
        );
        revalidatePath('/expenses');
        revalidateTag('expenses');
        return { status: 'success', message: 'Expense added successfully' };
      } catch (error) {
        return {
          status: 'error',
          message: 'Server Error: Failed to add Expense',
        };
      }
    }
  );

export const editExpenseAction = actionClient
  .schema(expenseSchema)
  .action(
    async ({
      parsedInput: {
        id,
        expense_upper_limit,
        expense_lower_limit,
        expense_detail,
        expense_code,
        status,
      },
    }) => {
      try {
        if (expense_upper_limit < expense_lower_limit) {
          return {
            status: 'error',
            message: 'Batas Atas tidak boleh lebih kecil dari Batas Bawah',
          };
        }
        await putExpense(
          id,
          String(expense_upper_limit),
          String(expense_lower_limit),
          expense_detail,
          expense_code,
          status
        );
        revalidatePath('/expenses');
        revalidateTag('expenses');
        return { status: 'success', message: 'Expense edited successfully' };
      } catch (error) {
        return {
          status: 'error',
          message: 'Server Error: Failed to edit Expense',
        };
      }
    }
  );

const deleteExpenseSchema = z.object({
  id: z.number(),
});

export const removeExpenseAction = actionClient
  .schema(deleteExpenseSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      await deleteExpense(id);
      revalidatePath('/expenses');
      revalidateTag('expenses');
      return { status: 'success', message: 'Expense deleted successfully' };
    } catch (error) {
      return {
        status: 'error',
        message: 'Server Error: Failed to delete Expense',
      };
    }
  });
