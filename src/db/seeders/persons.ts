import { seed } from 'drizzle-seed';
import db from '@/db/index';
import { personsTable } from '../schema';

const seedPersons = async () => {
  await seed(db, { personsTable }).refine((funcs) => ({
    personsTable: {
      columns: {
        id: funcs.string({
          isUnique: true,
        }),
        nik: funcs.int({
          minValue: 100000000000,
          maxValue: 999999999999,
          isUnique: true,
        }),
        name: funcs.fullName(),
        dateOfBirth: funcs.date(),
        phoneNumber: funcs.phoneNumber({
          prefixes: ['+62 8'],
        }),
        address: funcs.streetAddress(),
        email: funcs.email(),
        whatsapp: funcs.phoneNumber({
          prefixes: ['+62 8'],
        }),
        instagram: funcs.default({
          defaultValue: `https://instagram.com/`,
        }),
        facebook: funcs.default({
          defaultValue: `https://www.facebook.com/`,
        }),
        subDistrict: funcs.valuesFromArray({
          values: ['Kesawan', 'Silalas', 'Sei Agul', 'Polonia'],
        }),
        district: funcs.valuesFromArray({
          values: ['Medan Barat', 'Medan Polonia'],
        }),
        city: funcs.default({ defaultValue: 'Medan' }),
        province: funcs.default({ defaultValue: 'Sumatera Utara' }),
      },
      count: 100,
    },
  }));
};

seedPersons();
