import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import db from '@/db/index';
import { usersTable } from '../schema';

const seedUsers = async () => {
  console.log('seeding users..');
  const users: (typeof usersTable.$inferInsert)[] = [
    {
      id: `user-${uuidv4()}`,
      username: 'admin',
      nip: String(Math.floor(Math.random() * 90000) + 10000),
      name: 'admin',
      password: await bcrypt.hash('password', 10),
      role: 'Admin',
      status: 'Active',
    },
    {
      id: `user-${uuidv4()}`,
      username: 'manager',
      nip: String(Math.floor(Math.random() * 90000) + 10000),
      name: 'manager',
      password: await bcrypt.hash('password', 10),
      role: 'Manager',
      status: 'Active',
    },
    {
      id: `user-${uuidv4()}`,
      username: 'leader',
      nip: String(Math.floor(Math.random() * 90000) + 10000),
      name: 'Leader',
      password: await bcrypt.hash('password', 10),
      role: 'Leader',
      status: 'Active',
    },
    {
      id: `user-${uuidv4()}`,
      username: 'cro1',
      nip: String(Math.floor(Math.random() * 90000) + 10000),
      name: 'CRO 1',
      password: await bcrypt.hash('password', 10),
      role: 'CRO',
      status: 'Active',
    },
  ];

  await db.insert(usersTable).values(users);
  console.log('users seeded');
};

seedUsers();
