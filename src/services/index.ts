import { PrismaClient } from '@prisma/client';
import { prisma } from '@/app/lib/prisma';

export default class DatabaseService {
  protected static createSearchFilter<WhereInput>(
    search: string | undefined,
    filterConfig: { [K in keyof WhereInput]?: string }
  ): WhereInput | {} {
    if (!search) {
      return {};
    }

    const orConditions = Object.keys(filterConfig).map((key) => ({
      [key]: { contains: search, mode: 'insensitive' },
    }));

    return { OR: orConditions };
  }

  protected static async getAll<T>(
    model: keyof PrismaClient,
    page: number,
    per_page: number,
    search?: string,
    filterConfig?: { [key: string]: string }
  ): Promise<{ data: T; totalPages: number }> {
    const offset = (page - 1) * per_page;

    const searchFilter = DatabaseService.createSearchFilter(
      search,
      filterConfig || {}
    );

    const [data, totalCount] = await prisma.$transaction([
      (prisma[model] as any).findMany({
        where: searchFilter,
        skip: offset,
        take: per_page,
        orderBy: { created_at: 'desc' },
      }),
      (prisma[model] as any).count({ where: searchFilter }),
    ]);

    const totalPages = Math.ceil(totalCount / per_page);

    return { data, totalPages };
  }
}
