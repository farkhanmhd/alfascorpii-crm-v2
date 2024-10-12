import { PrismaClient } from '@prisma/client';
import { id_ID, Faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const faker = new Faker({
  locale: [id_ID],
});

async function seedStaff() {
  const adminPassword = await bcrypt.hash('admin123', 10);

  const admin = prisma.staff.create({
    data: {
      username: 'admin',
      name: 'admin',
      email: 'admincrm@alfascorpii.com',
      nip: `${faker.number.int({ min: 10000000, max: 99999999 })}`,
      status: 'VALID',
      role: 'admin', // Admin role
      password: adminPassword, // Admin password
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    },
  });

  const staffPromises = Array.from({ length: 100 }, async () => {
    const hashedPassword = await bcrypt.hash(
      faker.internet.password({ length: 16 }),
      10
    );

    const username = faker.internet.userName().toLowerCase();

    return prisma.staff.create({
      data: {
        username,
        name: faker.person.fullName(),
        email: `${username}@alfascorpii.com`,
        nip: `${faker.number.int({ min: 10000000, max: 99999999 })}`,
        status: faker.helpers.arrayElement(['VALID', 'SUSPEND', 'RESIGN']),
        role: 'user',
        password: hashedPassword,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  console.log('Seeding staff...');
  await Promise.all([admin, ...staffPromises]);
  console.log('Finished seeding staff');
}

seedStaff()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
