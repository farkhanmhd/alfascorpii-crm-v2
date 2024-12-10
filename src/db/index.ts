import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';

config({
  path: '.env.local',
});

const db = drizzle(process.env.DATABASE_URL!);

export default db;
