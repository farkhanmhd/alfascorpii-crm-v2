import DatabaseService from '@/services';
import { prisma } from '@/app/lib/prisma';

export default class PekerjaanService extends DatabaseService {
  static async getListPekerjaan(page: number, limit: number, search?: string) {
    const filterConfig = {
      pekerjaan: 'pekerjaan',
    };

    const { data: pekerjaan, totalPages } = await PekerjaanService.getAll(
      'pekerjaan',
      page,
      limit,
      search,
      filterConfig
    );

    return { pekerjaan, totalPages };
  }

  static async createNewPekerjaan(pekerjaan: string, kode: string) {
    const newPekerjaan = await prisma.pekerjaan.create({
      data: {
        pekerjaan,
        kode,
      },
    });

    return newPekerjaan;
  }

  static async updatePekerjaan(
    id: string,
    pekerjaan: string,
    kode: string,
    status: 'SHOW' | 'HIDE'
  ) {
    const updatedPekerjaan = await prisma.pekerjaan.update({
      where: {
        id,
      },
      data: {
        pekerjaan,
        kode,
        status,
        updated_at: new Date(),
      },
    });

    return updatedPekerjaan;
  }

  static async deletePekerjaan(id: string) {
    await prisma.pekerjaan.delete({
      where: {
        id,
      },
    });
  }
}
