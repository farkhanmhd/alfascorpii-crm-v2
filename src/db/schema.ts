import { relations } from 'drizzle-orm';
import {
  mysqlTable,
  varchar,
  timestamp,
  mysqlEnum,
} from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: varchar({ length: 100 }).primaryKey(),
  username: varchar({ length: 255 }).notNull().unique(),
  nip: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  role: mysqlEnum(['Admin', 'Manager', 'Leader', 'CRO']),
  status: mysqlEnum(['Active', 'Inactive']),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const refreshTokensTable = mysqlTable('refresh_tokens', {
  id: varchar({ length: 100 }).primaryKey(),
  userId: varchar({ length: 100 })
    .notNull()
    .references(() => usersTable.id),
  token: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  refreshTokens: many(refreshTokensTable),
}));

export const refreshTokenRelations = relations(
  refreshTokensTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [refreshTokensTable.userId],
      references: [usersTable.id],
    }),
  })
);
