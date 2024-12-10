// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

config({
  path: '.env.local',
});

export default defineConfig({
  out: './src/db/drizzle',
  schema: './src/db/schema.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
