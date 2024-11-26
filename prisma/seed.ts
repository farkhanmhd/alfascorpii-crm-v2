import bcrypt from 'bcrypt';
import prisma from '@/prisma';
import {
  religiousHolidays,
  motorcycleNames,
  dealers,
  jobs,
  firstNames,
  lastNames,
  provinces,
  userRoles,
  // callerRelations,
  // followUpMethods,
  // followUpStatuses,
  // followUpDetails,
  // followUpResults,
  // houseOwnershipStatuses,
  // financialLevels,
} from './enums';

const seed = async () => {
  try {
    console.log('seeding...');
    // Seed Users (with bcrypt password)
    const hashedPassword = await bcrypt.hash('password123', 10); // Replace with the actual password you want to hash

    await prisma.user.createMany({
      data: Array.from({ length: 4 }, (_, i) => ({
        nip: `NIP00${i + 1}`,
        name: `${firstNames[i]} ${lastNames[i]}`,
        role: userRoles[i],
        username: userRoles[i].toLowerCase(),
        password: hashedPassword,
      })),
    });

    // Seed Jobs
    await prisma.job.createMany({
      data: Array.from({ length: 5 }, (_, i) => ({
        jobName: jobs[i],
      })),
    });

    // Seed Dealers
    await prisma.dealer.createMany({
      data: dealers,
    });

    // Seed ReligiousHolidays
    await prisma.religiousHoliday.createMany({
      data: religiousHolidays,
    });

    // Seed MotorcycleTypes
    await prisma.motorcycleType.createMany({
      data: motorcycleNames,
    });

    // Seed Leasing
    await prisma.leasing.createMany({
      data: [
        { leasingName: 'BAF' },
        { leasingName: 'SOF' },
        { leasingName: 'ADIRA' },
        { leasingName: 'BANK SUMUT' },
        { leasingName: 'MANDALA' },
      ],
    });

    await prisma.hobby.createMany({
      data: [
        { hobbyName: 'Reading' },
        { hobbyName: 'Cycling' },
        { hobbyName: 'Photography' },
        { hobbyName: 'Traveling' },
        { hobbyName: 'Cooking' },
      ],
    });

    // Seed HouseOwnership
    await prisma.houseOwnership.createMany({
      data: [
        { ownershipStatus: 'OWNED' },
        { ownershipStatus: 'PARENTS_PROPERTY' },
        { ownershipStatus: 'RENTED' },
        { ownershipStatus: 'MOVING' },
        { ownershipStatus: 'OFFICIAL_HOUSE' },
        { ownershipStatus: 'OTHERS' },
      ],
    });

    // Seed IncomeRanges
    await prisma.income.createMany({
      data: [
        {
          lowerLimit: 1000000,
          upperLimit: 3000000,
          incomeLevel: 'VERY_LOW',
          incomeDetail: '1 JT - 3 JT',
        },
        {
          lowerLimit: 3000001,
          upperLimit: 6000000,
          incomeLevel: 'LOW',
          incomeDetail: '3 JT - 6 JT',
        },
        {
          lowerLimit: 6000001,
          upperLimit: 10000000,
          incomeLevel: 'MEDIUM',
          incomeDetail: '6 JT - 10 JT',
        },
        {
          upperLimit: 10000001,
          lowerLimit: 100000000,
          incomeLevel: 'HIGH',
          incomeDetail: '10 JT - 100 JT',
        },
      ],
    });

    // Seed ExpenseRanges
    await prisma.expense.createMany({
      data: [
        {
          lowerLimit: 1000000,
          upperLimit: 3000000,
          expenseLevel: 'VERY_LOW',
          expenseDetail: '1 JT - 3 JT',
        },
        {
          lowerLimit: 3000001,
          upperLimit: 6000000,
          expenseLevel: 'LOW',
          expenseDetail: '3 JT - 6 JT',
        },
        {
          lowerLimit: 6000001,
          upperLimit: 10000000,
          expenseLevel: 'MEDIUM',
          expenseDetail: '6 JT - 10 JT',
        },
        {
          lowerLimit: 10000001,
          upperLimit: 100000000,
          expenseLevel: 'HIGH',
          expenseDetail: '10 JT - 100 JT',
        },
      ],
    });

    // seed Customer
    await prisma.customer.createMany({
      data: Array.from({ length: 100 }, (_, index) => ({
        nik: `1234567890123${index.toString().padStart(2, '0')}`, // Ensure unique and padded `nik`
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
          lastNames[Math.floor(Math.random() * lastNames.length)]
        }`, // Combine random first and last name
        phoneNumber: `+62812345678${index.toString().padStart(2, '0')}`,
        dateOfBirth: new Date(
          `1990-${(Math.floor(Math.random() * 12) + 1)
            .toString()
            .padStart(2, '0')}-${(Math.floor(Math.random() * 28) + 1)
            .toString()
            .padStart(2, '0')}`
        ), // Random date of birth
        address: `Jl. Contoh No. ${index + 1}`,
        subDistrict: `Subdistrict ${index + 1}`,
        district: `District ${index + 1}`,
        city: `City ${index + 1}`,
        province: provinces[Math.floor(Math.random() * provinces.length)], // Random province
        email: `customer${index + 1}@example.com`,
        whatsapp: `+62812345678${index.toString().padStart(2, '0')}`,
        instagram: `https://instagram.com/username${index + 1}`,
        facebook: `https://www.facebook.com/username${index + 1}`,
      })),
    });

    // seed customer with dealer
    const customerIds = await prisma.customer.findMany({
      select: {
        id: true,
      },
    });

    const motorcycleTypeIds = await prisma.motorcycleType.findMany({
      select: {
        id: true,
      },
    });

    await prisma.motorcycle.createMany({
      data: Array.from({ length: 100 }, () => ({
        price: Math.floor(Math.random() * 50000000) + 15000000, // Random price between 15M and 65M
        typeId:
          motorcycleTypeIds[
            Math.floor(Math.random() * motorcycleTypeIds.length)
          ].id, // Random typeId from fetched MotorcycleType ids
        chassisId: `CHS${Math.random().toString(36).substring(2, 8).toUpperCase()}`, // Random alphanumeric chassis ID
        engineId: `ENG${Math.random().toString(36).substring(2, 8).toUpperCase()}`, // Random alphanumeric engine ID
      })),
    });

    // seeding purchases
    await prisma.purchase.createMany({
      data: Array.from({ length: 50 }, () => ({
        purchaseType: 'CASH',
        purchaseAmount: Math.floor(Math.random() * 50000000) + 15000000, // Random price between 15M and 65M,
        purchaseDate: new Date(),
      })),
    });

    await prisma.purchase.createMany({
      data: Array.from({ length: 50 }, () => ({
        purchaseType: 'CREDIT',
        purchaseAmount: Math.floor(Math.random() * 50000000) + 15000000, // Random price between 15M and 65M,
        purchaseDate: new Date(),
      })),
    });

    const purchaseIds = await prisma.purchase.findMany({
      select: {
        id: true,
      },
    });

    const motorcycleIds = await prisma.motorcycle.findMany({
      select: {
        id: true,
      },
    });

    await prisma.purchaseDealer.createMany({
      data: Array.from({ length: 100 }, (_, i) => ({
        purchaseId: purchaseIds[i].id,
        dealerId: Math.floor(Math.random() * 6) + 1,
      })),
    });

    await prisma.customerPurchases.createMany({
      data: Array.from({ length: 100 }, (_, i) => ({
        customerId: customerIds[i].id,
        purchaseId: purchaseIds[i].id,
      })),
    });

    await prisma.purchaseMotorcycle.createMany({
      data: Array.from({ length: 100 }, (_, i) => ({
        purchaseId: purchaseIds[i].id,
        motorcycleId: motorcycleIds[i].id,
      })),
    });

    await prisma.customerJob.createMany({
      data: Array.from({ length: 100 }, (_, i) => ({
        customerId: customerIds[i].id,
        jobId: Math.floor(Math.random() * 5) + 1,
      })),
    });

    await prisma.customerHobby.createMany({
      data: Array.from({ length: 100 }, (_, i) => ({
        customerId: customerIds[i].id,
        hobbyId: Math.floor(Math.random() * 5) + 1,
        hobbyDetail: `Hobby Detail`,
      })),
    });

    await prisma.customerFinancial.createMany({
      data: Array.from({ length: 100 }, (_, i) => ({
        customerId: customerIds[i].id,
        incomeId: Math.floor(Math.random() * 4) + 1,
        expenseId: Math.floor(Math.random() * 4) + 1,
      })),
    });

    await prisma.customerHouseOwnership.createMany({
      data: Array.from({ length: 100 }, (_, i) => ({
        customerId: customerIds[i].id,
        houseOwnershipId: Math.floor(Math.random() * 6) + 1,
        houseOwnershipDetail: `House Ownership Detail`,
      })),
    });

    await prisma.customerHoliday.createMany({
      data: Array.from({ length: 100 }, (_, i) => ({
        customerId: customerIds[i].id,
        holidayId: Math.floor(Math.random() * 4) + 1,
      })),
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
