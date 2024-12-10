import { drizzle } from 'drizzle-orm/mysql2';
import { seed } from 'drizzle-seed';
import bcrypt from 'bcrypt';
import { usersTable } from './schema';

const db = drizzle(process.env.DATABASE_URL as string);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    username: 'john',
    password: await bcrypt.hash('password', 10),
    role: 'ADMIN',
  };

  await seed(db, { user });
}

main();

export default db;
