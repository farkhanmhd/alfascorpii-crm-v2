-- CreateEnum
CREATE TYPE "Status" AS ENUM ('HIDE', 'SHOW');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "dealer" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "motor" TEXT NOT NULL,
    "follow_up" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dealer" (
    "id" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dealer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leasing" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Leasing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dpack_Model" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "catalog" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dpack_Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hari_Besar" (
    "id" TEXT NOT NULL,
    "hari_besar" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "agama" TEXT NOT NULL,
    "ucapan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hari_Besar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kerabat" (
    "id" TEXT NOT NULL,
    "kerabat" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kerabat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pekerjaan" (
    "id" TEXT NOT NULL,
    "pekerjaan" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pekerjaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pendidikan" (
    "id" TEXT NOT NULL,
    "pendidikan" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengeluaran" (
    "id" TEXT NOT NULL,
    "batas_bawah" INTEGER NOT NULL,
    "batas_atas" INTEGER NOT NULL,
    "detail" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengeluaran_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penghasilan" (
    "id" TEXT NOT NULL,
    "batas_bawah" INTEGER NOT NULL,
    "batas_atas" INTEGER NOT NULL,
    "detail" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penghasilan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hobi" (
    "id" TEXT NOT NULL,
    "hobi" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hobi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status_Rumah" (
    "id" TEXT NOT NULL,
    "status_rumah" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Status_Rumah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metode_FU" (
    "id" TEXT NOT NULL,
    "metode" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metode_FU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keterangan_FU" (
    "id" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "kategori_hasil" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Keterangan_FU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keterangan_Hasil" (
    "id" TEXT NOT NULL,
    "keterangan" TEXT NOT NULL,
    "kategori_hasil" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'SHOW',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Keterangan_Hasil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phone_key" ON "Customer"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_nip_key" ON "Staff"("nip");

-- CreateIndex
CREATE UNIQUE INDEX "Dealer_kode_key" ON "Dealer"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "Pekerjaan_kode_key" ON "Pekerjaan"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "Pendidikan_kode_key" ON "Pendidikan"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "Pengeluaran_kode_key" ON "Pengeluaran"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "Penghasilan_kode_key" ON "Penghasilan"("kode");
