'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useParams } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { SelectBox } from '@/components/elements/form/Select';
import DatePicker from '@/components/elements/form/DatePicker';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scrollarea';
import TextInput from '@/components/elements/form/TextInput';
import { ICustomer, OptionsProps } from '@/types';
import { updateCustomerAction } from '@/app/lib/actions/customers';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Props extends OptionsProps {
  customer: ICustomer;
}

const UpdateCustomerDialog = ({ ...props }: Props) => {
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const { id } = params;
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [hobby, setHobby] = useState('');
  const [houseOwnership, setHouseOwnership] = useState('');
  const [job, setJob] = useState('');
  const [holiday, setHoliday] = useState('');
  const [bornDate, setBornDate] = useState<Date>(
    new Date(props.customer.date_of_birth)
  );

  const filterEmptyValues = (obj: Record<string, any>) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([, value]) => {
        if (value === null || value === undefined || value === '') return false;
        if (typeof value === 'string' && value.trim() === '') return false;
        return true;
      })
    );
  };

  const { execute, isPending } = useAction(
    async (formData) => {
      const rawData = {
        id: id as string,
        nik: formData.get('nik'),
        customer_name: formData.get('customer_name'),
        customer_address: formData.get('customer_address'),
        postal_code: formData.get('postal_code'),
        province: formData.get('province'),
        regency_or_city: formData.get('regency_or_city'),
        district: formData.get('district'),
        sub_district: formData.get('sub_district'),
        telephone: formData.get('telephone'),
        mobile_phone: formData.get('mobile_phone'),
        date_of_birth: format(bornDate, 'yyyy-MM-dd'),
        holiday_id: Number(holiday) || undefined,
        hobby_id: Number(hobby) || undefined,
        income_id: Number(income) || undefined,
        expense_id: Number(expense) || undefined,
        house_ownership_id: Number(houseOwnership) || undefined,
        job_id: Number(job) || undefined,
        amount_of_family: Number(formData.get('amount_of_family')) || undefined,
        amount_of_motorcycle:
          Number(formData.get('amount_of_motorcycle')) || undefined,
        instagram: formData.get('instagram'),
        whatsapp_number: formData.get('whatsapp_number'),
        email: formData.get('email'),
        facebook: formData.get('facebook'),
        hobby_description: formData.get('hobby_description'),
      };

      const filteredData = { id: rawData.id, ...filterEmptyValues(rawData) };
      console.log(JSON.stringify(filteredData, null, 2));
      return updateCustomerAction(filteredData);
    },
    {
      onSuccess: (result) => {
        toast({
          title: result?.data?.status === 'success' ? 'Success' : 'Error',
          description: result?.data?.message,
          variant:
            result?.data?.status === 'success' ? 'default' : 'destructive',
        });
        setOpen(false);
      },
    }
  );

  console.log(props.customer);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="blue">Update Data Customer</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-4xl">
        <form action={execute}>
          <AlertDialogHeader className="px-2">
            <AlertDialogTitle>Form Data Customer</AlertDialogTitle>
          </AlertDialogHeader>
          <ScrollArea className="py-6">
            <div className="grid max-h-[600px] grid-cols-1 gap-6 px-2 md:grid-cols-2">
              <TextInput
                label="Nomor Induk Kependudukan (NIK)"
                defaultValue={props.customer.nik}
                id="nik"
                placeholder="Nomor Induk Kependudukan (NIK)"
                className="h-10"
              />
              <DatePicker
                label="Tanggal Lahir"
                id="date_of_birth"
                date={bornDate}
                setDate={setBornDate}
              />
              <TextInput
                label="Nama"
                defaultValue={props.customer.customer_name}
                id="customer_name"
                placeholder="Nama Customer"
                className="h-10"
              />
              <TextInput
                label="Nomor Telepon"
                defaultValue={props.customer.telephone}
                id="telephone"
                placeholder="Nomor Telepon"
                className="h-10"
              />
              <TextInput
                label="Nomor HP"
                defaultValue={props.customer.mobile_phone}
                id="mobile_phone"
                placeholder="Nomor HP"
                className="h-10"
              />
              <TextInput
                label="Alamat"
                defaultValue={props.customer.customer_address}
                id="customer_address"
                placeholder="Alamat Customer"
                className="h-10"
              />
              <SelectBox
                label="Hari Besar Keagamaan"
                id="holiday_id"
                options={props.holidayOpts}
                placeholder="Hari Besar Keagamaan"
                value={holiday}
                setValue={setHoliday}
              />
              <TextInput
                label="Kelurahan"
                defaultValue={props.customer.sub_district}
                id="sub_district"
                placeholder="Kelurahan"
                className="h-10"
              />
              <SelectBox
                label="Hobi"
                options={props.hobbyOpts}
                id="hobby_id"
                placeholder="Hobi Customer"
                className="h-10"
                value={hobby}
                setValue={setHobby}
              />
              <TextInput
                label="Kecamatan"
                defaultValue={props.customer.district}
                id="district"
                placeholder="Kecamatan"
                className="h-10"
              />
              <TextInput
                label="Deskripsi Hobi"
                defaultValue={props.customer.hobby_description}
                id="hobby_description"
                placeholder="Deskripsi Hobi"
                className="h-10"
              />
              <TextInput
                label="Kabupaten / Kota"
                defaultValue={props.customer.regency_or_city}
                id="regency_or_city"
                placeholder="Kabupaten / Kota"
                className="h-10"
              />
              <TextInput
                label="Jumlah Orang Dalam 1 Rumah"
                defaultValue={props.customer.amount_of_family}
                id="amount_of_family"
                placeholder="Jumlah Orang Dalam 1 Rumah"
                className="h-10"
              />
              <TextInput
                label="Provinsi"
                defaultValue={props.customer.province}
                id="province"
                placeholder="Provinsi"
                className="h-10"
              />
              <TextInput
                label="Jumlah Sepeda Motor di Rumah"
                defaultValue={props.customer.amount_of_motorcycle}
                id="amount_of_motorcycle"
                placeholder="Jumlah Sepeda Motor di Rumah"
                className="h-10"
              />
              <TextInput
                label="Kode Pos"
                defaultValue={props.customer.postal_code!}
                id="postal_code"
                placeholder="Kode Pos"
                className="h-10"
              />
              <TextInput
                label="Facebook"
                defaultValue={props.customer.facebook}
                id="facebook"
                placeholder="Facebook"
                className="h-10"
              />
              <SelectBox
                label="Status Rumah"
                id="house_ownership_id"
                options={props.houseOwnershipOpts}
                placeholder="Status Rumah"
                value={houseOwnership}
                setValue={setHouseOwnership}
              />
              <TextInput
                label="Instagram"
                defaultValue={props.customer.instagram}
                id="instagram"
                placeholder="Instagram"
                className="h-10"
              />
              <TextInput
                label="Email"
                defaultValue={props.customer.email}
                id="email"
                placeholder="email@example.com"
                className="h-10"
              />
              <SelectBox
                label="Pekerjaan"
                id="job_id"
                options={props.jobOpts}
                placeholder="Pekerjaan"
                value={job}
                setValue={setJob}
              />
              <TextInput
                label="Whatsapp"
                defaultValue={props.customer.whatsapp_number}
                id="whatsapp_number"
                placeholder="Whatsapp"
                className="h-10"
              />
              <SelectBox
                label="Penghasilan / Bulan"
                id="income_id"
                options={props.incomeOpts}
                placeholder="Penghasilan / Bulan"
                value={income}
                setValue={setIncome}
              />
              <SelectBox
                label="Pengeluaran / Bulan"
                id="expense_id"
                options={props.expenseOpts}
                placeholder="Pengeluaran / Bulan"
                value={expense}
                setValue={setExpense}
              />
            </div>
          </ScrollArea>
          <AlertDialogFooter className="gap-4">
            <AlertDialogCancel asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <Button variant="blue" disabled={isPending}>
              Submit
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateCustomerDialog;
