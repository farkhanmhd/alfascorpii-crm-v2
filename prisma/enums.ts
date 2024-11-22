import {
  Province,
  UserRole,
  CallerRelation,
  FollowUpMethod,
  FollowUpStatus,
  FollowUpDetail,
  FollowUpResult,
  HouseOwnershipStatus,
  FinancialLevel,
} from '@prisma/client';

export const motorcycleNames = [
  { motorcycleName: 'YZR M1' },
  { motorcycleName: 'YZF R1' },
  { motorcycleName: 'YZF R6' },
  { motorcycleName: 'YZF R3' },
  { motorcycleName: 'YZF R15' },
  { motorcycleName: 'MT1' },
  { motorcycleName: 'MT6' },
  { motorcycleName: 'MT3' },
  { motorcycleName: 'MT15' },
];

export const religiousHolidays = [
  {
    holidayName: 'Eid al-Fitr',
    holidayMessage: 'Selamat Hari Raya',
    holidayDate: new Date(),
  },
  {
    holidayName: 'Christmas',
    holidayMessage: 'Merry Christmas',
    holidayDate: new Date(),
  },
  {
    holidayName: 'Nyepi',
    holidayMessage: 'Hari Raya Nyepi',
    holidayDate: new Date(),
  },
  {
    holidayName: 'Idul Adha',
    holidayMessage: 'Selamat Idul Adha',
    holidayDate: new Date(),
  },
];

export const dealers = [
  {
    dealerCode: 'FAFA001',
    dealerName: 'SENTRAL YAMAHA MEDAN',
    dealerCity: 'MEDAN',
  },
  {
    dealerCode: 'FAFA006',
    dealerName: 'PT. ALFA SCORPII - AR HAKIM',
    dealerCity: 'MEDAN',
  },
  {
    dealerCode: 'FEFC002',
    dealerName: 'PT. ALFA SCORPII - BATAM CENTER',
    dealerCity: 'BATAM',
  },
  {
    dealerCode: 'FAFA003',
    dealerName: 'PT. ALFA SCORPII - SETIA BUDI',
    dealerCity: 'MEDAN',
  },
  {
    dealerCode: '9FM004',
    dealerName: 'PT. ALFA SCORPII - KATAMSO',
    dealerCity: 'MEDAN',
  },
  {
    dealerCode: '9FM012',
    dealerName: 'PT. ALFA SCORPII - GATSU',
    dealerCity: 'MEDAN',
  },
];

export const jobs = [
  'Software Engineer',
  'Marketing Manager',
  'HR Specialist',
  'Sales Executive',
  'Accountant',
];

export const firstNames = [
  'John',
  'Jane',
  'Rahmat',
  'Siti',
  'Ahmad',
  'Kartini',
  'Hendra',
  'Sri',
  'Laila',
  'Budi',
  'Dewi',
  'Eka',
  'Andi',
  'Nina',
  'Yusuf',
  'Fikri',
  'Aisyah',
  'Farhan',
  'Zahra',
  'Rizky',
];

export const lastNames = [
  'Doe',
  'Smith',
  'Hidayat',
  'Aminah',
  'Fadli',
  'Wahyuni',
  'Gunawan',
  'Rahayu',
  'Fitri',
  'Santoso',
  'Sartika',
  'Putri',
  'Wijaya',
  'Marlina',
  'Pratama',
  'Ramadhan',
  'Akbar',
  'Amelia',
  'Fauzan',
  'Nugraha',
];

export const provinces: Province[] = [
  'SUMATERA_UTARA',
  'ACEH',
  'KEPULAUAN_RIAU',
  'RIAU',
];

export const userRoles: UserRole[] = ['ADMIN', 'MANAGER', 'LEADER', 'CRO'];

export const callerRelations: CallerRelation[] = [
  'DIRECT_CUSTOMER',
  'PARENTS',
  'CHILDREN',
  'SPOUSE',
  'SIBLING',
  'NEIGHBOR',
  'UNCLE',
  'AUNT',
  'NEPHEW',
  'NIECE',
  'GRANDPARENTS',
  'COUSIN',
  'FRIEND',
  'OTHER',
];

export const followUpMethods: FollowUpMethod[] = ['CALL', 'WHATSAPP'];

export const followUpStatuses: FollowUpStatus[] = [
  'CONTACTED',
  'NOT_CONTACTED',
  'DELIVERED',
  'NOT_DELIVERED',
];

export const followUpDetails: FollowUpDetail[] = [
  'NOT_INTERESTED',
  'NOT_YET',
  'BUSY',
  'COLD',
  'WARM',
  'HOT',
  'UNANSWERED',
  'UNREGISTERED',
  'UNREACHABLE',
  'WRONG_NUMBER',
  'WRONG_CONNECTION',
  'INACTIVE',
];

export const followUpResults: FollowUpResult[] = [
  'CASH',
  'APPROVE',
  'CANCEL',
  'REJECT',
  'PENDING',
  'NOT_YET',
];

export const houseOwnershipStatuses: HouseOwnershipStatus[] = [
  'OWNED',
  'PARENTS_PROPERTY',
  'RENTED',
  'MOVING',
  'OFFICIAL_HOUSE',
  'OTHERS',
];

export const financialLevels: FinancialLevel[] = [
  'VERY_LOW',
  'LOW',
  'MEDIUM',
  'HIGH',
];
