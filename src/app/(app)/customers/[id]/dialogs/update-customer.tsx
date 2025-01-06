'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { SelectBox } from '@/components/fragments/form/Select';
import DatePicker from '@/components/fragments/form/DatePicker';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scrollarea';
import TextInput from '@/components/fragments/form/TextInput';

const UpdateCustomerDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="blue">Update Data Customer</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="px-2">
          <DialogTitle>Form Data Customer</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[556px]">
          <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
            <TextInput
              label="Nomor Induk Kependudukan (NIK)"
              defaultValue=""
              id="nik"
              placeholder="Nomor Induk Kependudukan (NIK)"
              className="h-10"
            />
            <DatePicker
              label="Tanggal Lahir"
              id="date_of_birth"
              initialDate={new Date()}
            />
            <TextInput
              label="Nama"
              defaultValue=""
              id="customer-name"
              placeholder="Nama Customer"
              className="h-10"
            />
            <TextInput
              label="Nomor Telepon"
              defaultValue=""
              id="phone-number"
              placeholder="Nomor Telepon"
              className="h-10"
            />
            <TextInput
              label="Nomor HP"
              defaultValue=""
              id="cellphone-number"
              placeholder="Nomor HP"
              className="h-10"
            />
            <TextInput
              label="Alamat"
              defaultValue=""
              id="customer-address"
              placeholder="Alamat Customer"
              className="h-10"
            />
            <SelectBox
              label="Hari Besar Keagamaan"
              id="hari-besar"
              options={[]}
              placeholder="Hari Besar Keagamaan"
            />
            <TextInput
              label="Kelurahan"
              defaultValue=""
              id="customer-sub-district"
              placeholder="Kelurahan"
              className="h-10"
            />
            <TextInput
              label="Hobi"
              defaultValue=""
              id="customer-hobby"
              placeholder="Hobi Customer"
              className="h-10"
            />
            <TextInput
              label="Kecamatan"
              defaultValue=""
              id="customer-district"
              placeholder="Kecamatan"
              className="h-10"
            />
            <TextInput
              label="Deskripsi Hobi"
              defaultValue=""
              id="customer-hobby-description"
              placeholder="Deskripsi Hobi"
              className="h-10"
            />
            <TextInput
              label="Kabupaten / Kota"
              defaultValue=""
              id="customer-city-regency"
              placeholder="Kabupaten / Kota"
              className="h-10"
            />
            <TextInput
              label="Jumlah Orang Dalam 1 Rumah"
              defaultValue=""
              id="family-count"
              placeholder="Jumlah Orang Dalam 1 Rumah"
              className="h-10"
            />
            <TextInput
              label="Provinsi"
              defaultValue=""
              id="customer-province"
              placeholder="Provinsi"
              className="h-10"
            />
            <TextInput
              label="Jumlah Sepeda Motor di Rumah"
              defaultValue=""
              id="motorcycle-count"
              placeholder="Jumlah Sepeda Motor di Rumah"
              className="h-10"
            />
            <TextInput
              label="Kode Pos"
              defaultValue=""
              id="postal-code"
              placeholder="Kode Pos"
              className="h-10"
            />
            <TextInput
              label="Facebook"
              defaultValue=""
              id="facebook"
              placeholder="Facebook"
              className="h-10"
            />
            <SelectBox
              label="Status Rumah"
              id="house-ownership"
              options={[]}
              placeholder="Status Rumah"
            />
            <TextInput
              label="Instagram"
              defaultValue=""
              id="instagram"
              placeholder="Instagram"
              className="h-10"
            />
            <SelectBox
              label="Pekerjaan"
              id="customer-job"
              options={[]}
              placeholder="Status Rumah"
            />
            <TextInput
              label="Whatsapp"
              defaultValue=""
              id="whatsapp"
              placeholder="Whatsapp"
              className="h-10"
            />
            <SelectBox
              label="Penghasilan / Bulan"
              id="income"
              options={[]}
              placeholder="Penghasilan / Bulan"
            />
            <SelectBox
              label="Deskripsi Pekerjaan"
              id="job-description"
              options={[]}
              placeholder="Deskripsi Pekerjaan"
            />
            <SelectBox
              label="Pengeluaran / Bulan"
              id="expense"
              options={[]}
              placeholder="Pengeluaran / Bulan"
            />
          </div>
        </ScrollArea>
        <DialogFooter className="gap-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="blue">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCustomerDialog;
