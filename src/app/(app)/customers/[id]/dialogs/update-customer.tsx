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
import { getErrorMessages } from '@/lib/utils';

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

  const {
    execute,
    isPending,
    result: formResult,
  } = useAction(
    async (formData) => {
      const data = {
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
        holiday_id: Number(holiday),
        hobby_id: Number(hobby),
        income_id: Number(income),
        expense_id: Number(expense),
        house_ownership: houseOwnership,
        job,
        amount_of_family: Number(formData.get('amount_of_family')),
        amount_of_motorcycle: Number(formData.get('amount_of_motorcycle')),
        instagram: formData.get('instagram'),
        whatsapp_number: formData.get('whatsapp_number'),
        email: formData.get('email'),
        facebook: formData.get('facebook'),
        hobby_description: formData.get('hobby_description'),
      };

      return updateCustomerAction(data);
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
                error={getErrorMessages(formResult?.validationErrors?.nik)}
              />
              <DatePicker
                label="Tanggal Lahir"
                id="date_of_birth"
                date={bornDate}
                setDate={setBornDate}
                error={getErrorMessages(
                  formResult?.validationErrors?.date_of_birth
                )}
              />
              <TextInput
                label="Nama"
                defaultValue={props.customer.customer_name}
                id="customer_name"
                placeholder="Nama Customer"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.customer_name
                )}
              />
              <TextInput
                label="Nomor Telepon"
                defaultValue={props.customer.telephone}
                id="telephone"
                placeholder="Nomor Telepon"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.telephone
                )}
              />
              <TextInput
                label="Nomor HP"
                defaultValue={props.customer.mobile_phone}
                id="mobile_phone"
                placeholder="Nomor HP"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.mobile_phone
                )}
              />
              <TextInput
                label="Alamat"
                defaultValue={props.customer.customer_address}
                id="customer_address"
                placeholder="Alamat Customer"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.customer_address
                )}
              />
              <SelectBox
                label="Hari Besar Keagamaan"
                id="holiday_id"
                options={props.holidayOpts}
                placeholder="Hari Besar Keagamaan"
                value={holiday}
                setValue={setHoliday}
                error={getErrorMessages(
                  formResult?.validationErrors?.holiday_id
                )}
              />
              <TextInput
                label="Kelurahan"
                defaultValue={props.customer.sub_district}
                id="sub_district"
                placeholder="Kelurahan"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.sub_district
                )}
              />
              <SelectBox
                label="Hobi"
                options={props.hobbyOpts}
                id="hobby_id"
                placeholder="Hobi Customer"
                className="h-10"
                value={hobby}
                setValue={setHobby}
                error={getErrorMessages(formResult?.validationErrors?.hobby_id)}
              />
              <TextInput
                label="Kecamatan"
                defaultValue={props.customer.district}
                id="district"
                placeholder="Kecamatan"
                className="h-10"
                error={getErrorMessages(formResult?.validationErrors?.district)}
              />
              <TextInput
                label="Deskripsi Hobi"
                defaultValue={props.customer.hobby_description}
                id="hobby_description"
                placeholder="Deskripsi Hobi"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.hobby_description
                )}
              />
              <TextInput
                label="Kabupaten / Kota"
                defaultValue={props.customer.regency_or_city}
                id="regency_or_city"
                placeholder="Kabupaten / Kota"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.regency_or_city
                )}
              />
              <TextInput
                label="Jumlah Orang Dalam 1 Rumah"
                defaultValue={props.customer.amount_of_family}
                id="amount_of_family"
                placeholder="Jumlah Orang Dalam 1 Rumah"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.amount_of_family
                )}
              />
              <TextInput
                label="Provinsi"
                defaultValue={props.customer.province}
                id="province"
                placeholder="Provinsi"
                className="h-10"
                error={getErrorMessages(formResult?.validationErrors?.province)}
              />
              <TextInput
                label="Jumlah Sepeda Motor di Rumah"
                defaultValue={props.customer.amount_of_motorcycle}
                id="amount_of_motorcycle"
                placeholder="Jumlah Sepeda Motor di Rumah"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.amount_of_motorcycle
                )}
              />
              <TextInput
                label="Kode Pos"
                defaultValue={props.customer.postal_code!}
                id="postal_code"
                placeholder="Kode Pos"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.postal_code
                )}
              />
              <TextInput
                label="Facebook"
                defaultValue={props.customer.facebook}
                id="facebook"
                placeholder="Facebook"
                className="h-10"
                error={getErrorMessages(formResult?.validationErrors?.facebook)}
              />
              <SelectBox
                label="Status Rumah"
                id="house_ownership_id"
                options={props.houseOwnershipOpts}
                placeholder="Status Rumah"
                value={houseOwnership}
                setValue={setHouseOwnership}
                error={getErrorMessages(
                  formResult?.validationErrors?.house_ownership_id
                )}
              />
              <TextInput
                label="Instagram"
                defaultValue={props.customer.instagram}
                id="instagram"
                placeholder="Instagram"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.instagram
                )}
              />
              <TextInput
                label="Email"
                defaultValue={props.customer.email}
                id="email"
                placeholder="email@example.com"
                className="h-10"
                type="email"
                error={getErrorMessages(formResult?.validationErrors?.email)}
              />
              <SelectBox
                label="Pekerjaan"
                id="job_id"
                options={props.jobOpts}
                placeholder="Pekerjaan"
                value={job}
                setValue={setJob}
                error={getErrorMessages(formResult?.validationErrors?.job_id)}
              />
              <TextInput
                label="Whatsapp"
                defaultValue={props.customer.whatsapp_number}
                id="whatsapp_number"
                placeholder="Whatsapp"
                className="h-10"
                error={getErrorMessages(
                  formResult?.validationErrors?.whatsapp_number
                )}
              />
              <SelectBox
                label="Penghasilan / Bulan"
                id="income_id"
                options={props.incomeOpts}
                placeholder="Penghasilan / Bulan"
                value={income}
                setValue={setIncome}
                error={getErrorMessages(
                  formResult?.validationErrors?.income_id
                )}
              />
              <SelectBox
                label="Pengeluaran / Bulan"
                id="expense_id"
                options={props.expenseOpts}
                placeholder="Pengeluaran / Bulan"
                value={expense}
                setValue={setExpense}
                error={getErrorMessages(
                  formResult?.validationErrors?.expense_id
                )}
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
