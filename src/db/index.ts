import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';

config({
  path: '.env',
});

const db = drizzle(process.env.DATABASE_URL!);

export default db;
