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
      role: 'admin',
      status: faker.helpers.arrayElement(['VALID', 'SUSPEND', 'RESIGN']),
      password: adminPassword,
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
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
    return dealer;
  });

  await Promise.all(dealers);
};

async function seedCustomers() {
  const customers = [
    {
      lokasi: 'Kep. Riau',
      motor: 'Yamaha Mio',
    },
    {
      lokasi: 'Riau',
      motor: 'Yamaha XSR',
    },
    {
      lokasi: 'Medan',
      motor: 'Yamaha Mio',
    },
    {
      lokasi: 'Pekanbaru',
      motor: 'Yamaha Vixion',
    },
    {
      lokasi: 'Riau',
      motor: 'Yamaha Aerox',
    },
    {
      lokasi: 'Riau',
      motor: 'Yamaha Aerox',
    },
    {
      lokasi: 'Kep. Riau',
      motor: 'Yamaha Aerox',
    },
    {
      lokasi: 'Riau',
      motor: 'Yamaha R15',
    },
    {
      lokasi: 'Aceh',
      motor: 'Yamaha Nmax',
    },
    {
      lokasi: 'Aceh',
      motor: 'Yamaha Vixion',
    },
    {
      lokasi: 'Medan',
      motor: 'Yamaha XMax',
    },
    {
      lokasi: 'Pekanbaru',
      motor: 'Yamaha R25',
    },
    {
      lokasi: 'Aceh',
      motor: 'Yamaha Nmax',
    },
    {
      lokasi: 'Kep. Riau',
      motor: 'Yamaha Aerox',
    },
    {
      lokasi: 'Medan',
      motor: 'Yamaha XSR',
    },
    {
      lokasi: 'Pekanbaru',
      motor: 'Yamaha Vixion',
    },
    {
      lokasi: 'Riau',
      motor: 'Yamaha R15',
    },
    {
      dealer: 'PT Alfa Scorpii 2',
      nama: 'Tom Hiddleston',
      lokasi: 'Riau',
      telepon: '+62 831-0123-4567',
      motor: 'Yamaha XMax',
      fu: 5,
    },
    {
      lokasi: 'Medan',
      motor: 'Yamaha Nmax',
    },
    {
      lokasi: 'Aceh',
      motor: 'Yamaha Aerox',
    },
  ];

  const customerPromises = customers.map((cust) => {
    return prisma.customer.create({
      data: {
        dealer: `PT Alfa Scorpii ${faker.number.int({ min: 1, max: 3 })}`,
        name: faker.person.fullName(),
        lokasi: cust.lokasi,
        phone: faker.phone.number(),
        motor: cust.motor,
        follow_up: faker.number.int({ min: 0, max: 9 }),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(customerPromises);
}

async function seedKerabat() {
  const kerabatData = [
    'AYAH-ANAK',
    'KONSUMEN LANGSUNG',
    'IBU-ANAK',
    'SUAMI-ISTRI',
    'KAKAK-ADIK',
    'SAUDARA',
    'TETANGGA',
    'PAMAN-PONAKAN',
    'TANTE-PONAKAN',
    'TEMAN',
    'LAINNYA',
  ];

  const kerabatPromises = kerabatData.map((kerabat) => {
    return prisma.kerabat.create({
      data: {
        kerabat,
        status: faker.helpers.arrayElement(['SHOW', 'HIDE']),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(kerabatPromises);
}

async function seedPekerjaan() {
  const pekerjaan = [
    { pekerjaan: 'Pegawai Negeri', kode: 'N' },
    { pekerjaan: 'Karyawan Swasta', kode: 'S' },
    { pekerjaan: 'Ibu Rumah Tangga', kode: 'I' },
    { pekerjaan: 'Profesional', kode: 'G' },
    { pekerjaan: 'Lain-lain', kode: 'L' },
    { pekerjaan: 'Pelajar', kode: 'P' },
    { pekerjaan: 'TNI / Polri', kode: 'T' },
    { pekerjaan: 'Wiraswasta', kode: 'W' },
    { pekerjaan: 'Petani/Nelayan', kode: 'F' },
    { pekerjaan: 'Buruh', kode: 'B' },
  ];

  const pekerjaanPromises = pekerjaan.map((data) => {
    return prisma.pekerjaan.create({
      data: {
        pekerjaan: data.pekerjaan,
        kode: data.kode,
        status: faker.helpers.arrayElement(['SHOW', 'HIDE']),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(pekerjaanPromises);
}

const seedPendidikan = async () => {
  const pendidikan = [
    { pendidikan: 'Tidak Sekolah', kode: 'A' },
    { pendidikan: 'SD / Sederajat', kode: 'B' },
    { pendidikan: 'SMP / Sederajat', kode: 'C' },
    { pendidikan: 'SMA / Sederajat', kode: 'D' },
    { pendidikan: 'Diploma 1 (D1)', kode: 'E' },
    { pendidikan: 'Diploma 2 (D2)', kode: 'F' },
    { pendidikan: 'Diploma 3 (D3)', kode: 'G' },
    { pendidikan: 'Sarjana (S1)', kode: 'H' },
    { pendidikan: 'Magister (S2)', kode: 'I' },
    { pendidikan: 'Doktoral (S3)', kode: 'J' },
    { pendidikan: 'Lainnya', kode: 'K' },
  ];

  const pendidikanPromises = pendidikan.map((data) => {
    return prisma.pendidikan.create({
      data: {
        pendidikan: data.pendidikan,
        kode: data.kode,
        status: 'SHOW',
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(pendidikanPromises);
};

const seedPengeluaran = async () => {
  const pengeluaran = [
    {
      batas_bawah: 7000001,
      batas_atas: 50000000,
      detail: '7jt - 8jt',
      kode: '7D',
    },
    {
      batas_bawah: 6000001,
      batas_atas: 7000000,
      detail: '6jt - 7jt',
      kode: '6D',
    },
    {
      batas_bawah: 5000001,
      batas_atas: 6000000,
      detail: '5jt - 6jt',
      kode: '5D',
    },
    {
      batas_bawah: 4000001,
      batas_atas: 5000000,
      detail: '4jt - 5jt',
      kode: '4D',
    },
    {
      batas_bawah: 3000001,
      batas_atas: 4000000,
      detail: '3jt - 4jt',
      kode: '3D',
    },
    {
      batas_bawah: 2000001,
      batas_atas: 3000000,
      detail: '2jt - 3jt',
      kode: '2D',
    },
    {
      batas_bawah: 1000001,
      batas_atas: 2000000,
      detail: '1jt - 2jt',
      kode: '1D',
    },
    {
      batas_bawah: 1,
      batas_atas: 1000000,
      detail: '1 - 1jt',
      kode: '0D',
    },
  ];

  const pengeluaranPromises = pengeluaran.map((data) => {
    return prisma.pengeluaran.create({
      data: {
        batas_bawah: data.batas_bawah,
        batas_atas: data.batas_atas,
        detail: data.detail,
        kode: data.kode,
        status: 'SHOW',
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(pengeluaranPromises);
};

const seedPenghasilan = async () => {
  const penghasilan = [
    {
      batas_bawah: 1,
      batas_atas: 1000000,
      detail: '1 - 1jt',
      kode: '0D',
    },
    {
      batas_bawah: 1000001,
      batas_atas: 2000000,
      detail: '1jt - 2jt',
      kode: '1D',
    },
    {
      batas_bawah: 2000001,
      batas_atas: 3000000,
      detail: '2jt - 3jt',
      kode: '2D',
    },
    {
      batas_bawah: 3000001,
      batas_atas: 4000000,
      detail: '3jt - 4jt',
      kode: '3D',
    },
    {
      batas_bawah: 4000001,
      batas_atas: 5000000,
      detail: '4jt - 5jt',
      kode: '4D',
    },
    {
      batas_bawah: 5000001,
      batas_atas: 6000000,
      detail: '5jt - 6jt',
      kode: '5D',
    },
    {
      batas_bawah: 6000001,
      batas_atas: 7000000,
      detail: '6jt - 7jt',
      kode: '6D',
    },
    {
      batas_bawah: 7000001,
      batas_atas: 50000000,
      detail: '7jt - 8jt',
      kode: '7D',
    },
  ];

  const penghasilanPromises = penghasilan.map((data) => {
    return prisma.penghasilan.create({
      data: {
        batas_bawah: data.batas_bawah,
        batas_atas: data.batas_atas,
        detail: data.detail,
        kode: data.kode,
        status: 'SHOW',
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(penghasilanPromises);
};

const seedHobby = async () => {
  const daftarhobi = [
    'OLAHRAGA',
    'MEMBACA',
    'MAIN GAME',
    'BERKEBUN',
    'BERMAIN MUSIK',
    'FOTOGRAFI',
    'KULINER',
    'MEMASAK',
    'MENULIS',
    'NONTON',
    'SENI',
    'TOURING',
    'OTOMOTIF',
    'TRAVELLING',
    'LAINNYA',
  ];

  const hobbyPromises = daftarhobi.map((hobi) => {
    return prisma.hobi.create({
      data: {
        hobi,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(hobbyPromises);
};

const seedStatusRumah = async () => {
  const statusRumah = [
    {
      status_rumah: 'MILIK SENDIRI',
    },
    {
      status_rumah: 'ORANG TUA',
    },
    {
      status_rumah: 'KOST',
    },
    {
      status_rumah: 'KONTRAK/SEWA',
    },
    {
      status_rumah: 'RUMAH DINAS',
    },
    {
      status_rumah: 'PINDAH',
    },
  ];

  const statusRumahPromises = statusRumah.map((data) => {
    return prisma.status_Rumah.create({
      data: {
        status_rumah: data.status_rumah,
        status: 'SHOW',
      },
    });
  });

  await Promise.all(statusRumahPromises);
};

const seedLeasing = async () => {
  const leasingNames = [
    'BAF',
    'SOF',
    'ADIRA',
    'MAF',
    'CSF',
    'IMFI',
    'INDOMOBIL',
    'BANK SUMUT',
    'MANDALA',
    'MUF',
    'WOM',
    'MMF',
    'MCF',
    'OTHERS',
  ];

  const leasingPromises = leasingNames.map((name) => {
    return prisma.leasing.create({
      data: {
        nama: name,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(leasingPromises);
};

const seedModel = async () => {
  const dpackModel = [
    {
      model: 'SUV',
      catalog: '2024',
      category: 'Electric',
      color: 'RED',
    },
    {
      model: 'Hatchback',
      catalog: '2026',
      category: 'Economy',
      color: 'BLUE',
    },
    {
      model: 'Truck',
      catalog: '2025',
      category: 'Diesel',
      color: 'BLACK',
    },
    {
      model: 'Sedan',
      catalog: '2023',
      category: 'Luxury',
      color: 'SILVER',
    },
    {
      model: 'Convertible',
      catalog: '2024',
      category: 'Hybrid',
      color: 'YELLOW',
    },
    {
      model: 'Wagon',
      catalog: '2026',
      category: 'Electric',
      color: 'BLUE',
    },
    {
      model: 'Minivan',
      catalog: '2025',
      category: 'Diesel',
      color: 'RED',
    },
    {
      model: 'Coupe',
      catalog: '2023',
      category: 'Luxury',
      color: 'BLACK',
    },
    {
      model: 'Van',
      catalog: '2024',
      category: 'Economy',
      color: 'SILVER',
    },
    {
      model: 'Sports Car',
      catalog: '2026',
      category: 'Hybrid',
      color: 'YELLOW',
    },
    {
      model: 'SUV',
      catalog: '2023',
      category: 'Luxury',
      color: 'BLACK',
    },
    {
      model: 'Truck',
      catalog: '2025',
      category: 'Diesel',
      color: 'RED',
    },
    {
      model: 'Hatchback',
      catalog: '2026',
      category: 'Economy',
      color: 'YELLOW',
    },
    {
      model: 'Wagon',
      catalog: '2024',
      category: 'Electric',
      color: 'SILVER',
    },
    {
      model: 'Minivan',
      catalog: '2025',
      category: 'Diesel',
      color: 'BLUE',
    },
    {
      model: 'Convertible',
      catalog: '2024',
      category: 'Hybrid',
      color: 'BLACK',
    },
    {
      model: 'Sedan',
      catalog: '2023',
      category: 'Luxury',
      color: 'YELLOW',
    },
    {
      model: 'Van',
      catalog: '2026',
      category: 'Economy',
      color: 'BLUE',
    },
    {
      model: 'Coupe',
      catalog: '2024',
      category: 'Electric',
      color: 'RED',
    },
    {
      model: 'Sports Car',
      catalog: '2025',
      category: 'Hybrid',
      color: 'SILVER',
    },
  ];

  const modelPromises = dpackModel.map((dpack) => {
    return prisma.dpack_Model.create({
      data: {
        model: dpack.model,
        catalog: dpack.catalog,
        category: dpack.category,
        color: dpack.color,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(modelPromises);
};

const seedHariBesar = async () => {
  const hariBesar = [
    {
      hariBesar: 'WAISAK',
      tanggal: '16-05-2022',
      agama: 'BUDDHA',
      ucapan: 'Selamat Hari Raya Waisak',
    },
    {
      hariBesar: 'NYEPI',
      tanggal: '03-03-2022',
      agama: 'HINDU',
      ucapan: 'SELAMAT HARI RAYA NYEPI',
    },
    {
      hariBesar: 'LEBARAN',
      tanggal: '02-05-2022',
      agama: 'ISLAM',
      ucapan: 'Selamat Hari Lebaran',
    },
    {
      hariBesar: 'NATAL/TAHUN BARU',
      tanggal: '25-12-2022',
      agama: 'KRISTEN PR',
      ucapan: 'Selamat Hari Natal dan Tahun Baru',
    },
    {
      hariBesar: 'NATAL/TAHUN BARU',
      tanggal: '25-12-2022',
      agama: 'KATOLIK',
      ucapan: 'Selamat Hari Natal dan Tahun Baru',
    },
    {
      hariBesar: 'IMLEK',
      tanggal: '01-02-2022',
      agama: 'KONGHUCU',
      ucapan: 'GONG XI FAT CAI',
    },
  ];

  const hariBesarPromises = hariBesar.map((hb) => {
    return prisma.hari_Besar.create({
      data: {
        hari_besar: hb.hariBesar,
        tanggal: hb.tanggal,
        agama: hb.agama,
        ucapan: hb.ucapan,
        status: faker.helpers.arrayElement(['AKTIF', 'HOLD']),
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(hariBesarPromises);
};

const seedMetodeFU = async () => {
  const metodeFollowUp = ['CALL', 'SMS', 'VISIT', 'WHATSAPP'];

  const metodeFollowUpPromises = metodeFollowUp.map((mf) => {
    return prisma.metode_FU.create({
      data: {
        metode: mf,
        status: 'SHOW',
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(metodeFollowUpPromises);
};

const seedKeteranganFU = async () => {
  const keteranganFU = [
    {
      keterangan: 'NOMOR TELEPON SALAH SAMBUNG',
      status: 'NOT CONTACTED',
      kategori_hasil: 'NOT CONTACTED',
    },
    {
      keterangan: 'BELUM BERMINAT',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'NOMOR TELEPON TIDAK DIANGKAT',
      status: 'NOT CONTACTED',
      kategori_hasil: 'NOT CONTACTED',
    },
    {
      keterangan: 'NOMOR TELEPON TIDAK TERDAFTAR',
      status: 'NOT CONTACTED',
      kategori_hasil: 'NOT CONTACTED',
    },
    {
      keterangan: 'BERMINAT KREDIT MOTOR',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'TIDAK BERMINAT',
      status: 'CONTACTED',
      kategori_hasil: 'TIDAK BERMINAT',
    },
    {
      keterangan: 'BERMINAT CASH',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'BERMINAT PRODUK LAIN',
      status: 'CONTACTED',
      kategori_hasil: 'TIDAK BERMINAT',
    },
    {
      keterangan: 'PIKIR PIKIR',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'MENUNGGU KEPUTUSAN PASANGAN/PENJAMIN',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'PASANGAN/PENJAMIN TIDAK SETUJU',
      status: 'CONTACTED',
      kategori_hasil: 'TIDAK BERMINAT',
    },
    {
      keterangan: 'MOTOR SUDAH DIJUAL',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'MOTOR TIDAK LAYAK',
      status: 'CONTACTED',
      kategori_hasil: 'TIDAK BERMINAT',
    },
    {
      keterangan: 'ANGSURAN MAHAL',
      status: 'CONTACTED',
      kategori_hasil: 'TIDAK BERMINAT',
    },
    {
      keterangan: 'PLAFOND TIDAK COCOK',
      status: 'CONTACTED',
      kategori_hasil: 'TIDAK BERMINAT',
    },
    {
      keterangan: 'BERUBAH PIKIRAN',
      status: 'CONTACTED',
      kategori_hasil: 'TIDAK BERMINAT',
    },
    {
      keterangan: 'DOKUMEN TIDAK LENGKAP',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'CUSTOMER MEMBATALKAN JANJI',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'CUSTOMER RESCHEDULE',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'CUSTOMER MEMBUTUHKAN DANA CEPAT',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'BPKB SUDAH DIJAMINKAN DI TEMPAT LAIN',
      status: 'CONTACTED',
      kategori_hasil: 'TIDAK BERMINAT',
    },
    {
      keterangan: 'ESTIMASI DANA SEDIKIT',
      status: 'CONTACTED',
      kategori_hasil: 'PROSPECT',
    },
    {
      keterangan: 'NOMOR TELEPON TIDAK BISA DIHUBUNGI',
      status: 'NOT CONTACTED',
      kategori_hasil: 'NOT CONTACTED',
    },
    {
      keterangan: 'NOMOR TELEPON YANG DIPUTAR SALAH',
      status: 'NOT CONTACTED',
      kategori_hasil: 'NOT CONTACTED',
    },
    {
      keterangan: 'NOMOR TELEPON TIDAK AKTIF',
      status: 'NOT CONTACTED',
      kategori_hasil: 'NOT CONTACTED',
    },
    {
      keterangan: 'PINDAH RUMAH',
      status: 'NOT CONTACTED',
      kategori_hasil: 'NOT CONTACTED',
    },
    {
      keterangan: 'TIDAK BERTEMU DENGAN KONSUMEN',
      status: 'NOT CONTACTED',
      kategori_hasil: 'NOT CONTACTED',
    },
  ];

  const keteranganFUPromises = keteranganFU.map((data) => {
    return prisma.keterangan_FU.create({
      data: {
        keterangan: data.keterangan,
        status: data.status,
        kategori_hasil: data.kategori_hasil,
        tampil: 'SHOW',
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(keteranganFUPromises);
};

const seedKeteranganHasil = async () => {
  const keteranganHasil = [
    { keterangan_hasil: 'NOT CONTACTED', status_fu: 'NOT CONTACTED' },
    { keterangan_hasil: 'MINAT', status_fu: 'CONTACTED' },
    { keterangan_hasil: 'PROSPECT', status_fu: 'CONTACTED' },
    { keterangan_hasil: 'TIDAK BERMINAT', status_fu: 'CONTACTED' },
    { keterangan_hasil: 'TIDAK BERTEMU', status_fu: 'CONTACTED' },
  ];

  const keteranganHasilPromises = keteranganHasil.map((data) => {
    return prisma.keterangan_Hasil.create({
      data: {
        keterangan_hasil: data.keterangan_hasil,
        status_fu: data.status_fu,
        status: 'SHOW',
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      },
    });
  });

  await Promise.all(keteranganHasilPromises);
};

const seedEverything = async () => {
  try {
    console.log('Seeding...');
    await Promise.all([
      seedStaff(),
      seedDealers(),
      seedCustomers(),
      seedKerabat(),
      seedPekerjaan(),
      seedPendidikan(),
      seedPengeluaran(),
      seedPenghasilan(),
      seedHobby(),
      seedStatusRumah(),
      seedLeasing(),
      seedModel(),
      seedHariBesar(),
      seedMetodeFU(),
      seedKeteranganFU(),
      seedKeteranganHasil(),
    ]);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Seeding Complete!');
    await prisma.$disconnect();
  }
};

seedEverything();
