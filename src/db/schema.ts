import {
  mysqlTable,
  mysqlEnum,
  varchar,
  timestamp,
  date,
} from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const usersTable = mysqlTable('Users', {
  id: varchar({ length: 64 }).notNull().primaryKey(),
  nip: varchar({ length: 10 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  role: mysqlEnum(['Admin', 'Manager', 'Leader', 'CRO']).notNull(),
  status: mysqlEnum(['Active', 'Inactive']).notNull(),
  username: varchar({ length: 16 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const personsTable = mysqlTable('Persons', {
  id: varchar({ length: 64 }).notNull().primaryKey(),
  nik: varchar({ length: 16 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  phoneNumber: varchar('phone_number', { length: 16 }).notNull().unique(),
  address: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }),
  whatsapp: varchar({ length: 16 }).unique(),
  instagram: varchar({ length: 255 }),
  facebook: varchar({ length: 255 }),
  subDistrict: varchar('sub_district', { length: 255 }),
  district: varchar('district', { length: 255 }),
  cityOrRegency: varchar('city_or_regency', { length: 255 }),
  province: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const customersTable = mysqlTable('Customers', {
  id: varchar({ length: 64 }).notNull().primaryKey(),
  personId: varchar('person_id', { length: 64 })
    .notNull()
    .unique()
    .references(() => personsTable.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const personRelation = relations(personsTable, ({ one }) => ({
  customer: one(customersTable, {
    fields: [personsTable.id],
    references: [customersTable.personId],
  }),
}));

export const customerRelation = relations(customersTable, ({ one }) => ({
  person: one(personsTable, {
    fields: [customersTable.personId],
    references: [personsTable.id],
  }),
}));
