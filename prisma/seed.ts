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

  await Promise.all([admin, ...staffPromises]);
}

const seedDealers = async () => {
  const dealers = Array.from({ length: 20 }, async () => {
    const dealer = prisma.dealer.create({
      data: {
        kode: `FA${faker.number.int({ min: 0, max: 99999 })}`,
        nama: faker.company.name(),
        status: faker.helpers.arrayElement(['SHOW', 'HIDE']),
      },
    });
    return dealer;
  });

  await Promise.all(dealers);
};

const seedEverything = async () => {
  try {
    console.log('Seeding...');
    await Promise.all([seedStaff(), seedDealers()]);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Seeding Complete!');
    await prisma.$disconnect();
  }
};

seedEverything();
