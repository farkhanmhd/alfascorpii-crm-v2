'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { useAction } from 'next-safe-action/hooks';
import { addFollowUpAction } from '@/app/lib/actions/follow-up';
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
import { Separator } from '@/components/ui/separator';
import DatePicker from '@/components/elements/form/DatePicker';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import TextInput from '@/components/elements/form/TextInput';
import TextField from '@/components/elements/form/TextArea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { SelectOptions } from '@/types';
import ComboBox from '@/components/elements/form/ComboBox';
import { toast } from '@/hooks/use-toast';
import { FollowUpData } from '@/app/lib/data/follow-up';

type Props = {
  motorcyclesOpts: SelectOptions[];
  holidayOpts: SelectOptions[];
  jobOpts: SelectOptions[];
  relationOpts: SelectOptions[];
  fuDetailOpts: SelectOptions[];
  fuResultOpts: SelectOptions[];
  fuMethodOpts: SelectOptions[];
  fuStatusOpts: SelectOptions[];
  incomeOpts: SelectOptions[];
  expenseOpts: SelectOptions[];
  hobbyOpts: SelectOptions[];
  houseOwnershipOpts: SelectOptions[];
};

const religions: SelectOptions[] = [
  { label: 'Islam', value: 'Islam' },
  { label: 'Kristen', value: 'Kristen' },
  { label: 'Katolik', value: 'Katolik' },
  { label: 'Hindu', value: 'Hindu' },
  { label: 'Budha', value: 'Budha' },
  { label: 'Konghucu', value: 'Konghucu' },
];

const FollowUpDialog = ({ ...props }: Props) => {
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<boolean>(false);
  const [relation, setRelation] = useState('');
  const [motorcycle, setMotorcycle] = useState('');
  const [followUpDetail, setFollowUpDetail] = useState('');
  const [followUpResult, setFollowUpResult] = useState('');
  const [followUpMethod, setFollowUpMethod] = useState('');
  const [followUpStatus, setFollowUpStatus] = useState('');
  const [religion, setReligion] = useState('');
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [hobby, setHobby] = useState('');
  const [houseOwnership, setHouseOwnership] = useState('');
  const [job, setJob] = useState('');
  const [holiday, setHoliday] = useState('');
  const [fuDate, setFuDate] = useState<Date>(new Date());
  const [bornDate, setBornDate] = useState<Date>(new Date());
  const [jobDetail, setJobDetail] = useState<string>('');

  const { execute, isPending } = useAction(
    async (formData) => {
      const data: FollowUpData = {
        customer_id: Number(params.id),
        recipient_name: formData.get('recipient_name'),
        whatsapp_number: formData.get('whatsapp_number'),
        additional_information: formData.get('additional_information'),
        follow_up_date: format(fuDate, 'yyyy-MM-dd'),
        follow_up_note: formData.get('follow_up_note'),
      };

      if (relation) {
        data.relation_id = Number(relation);
      }
      if (followUpMethod) {
        data.follow_up_method_id = Number(followUpMethod);
      }
      if (followUpStatus) {
        data.follow_up_status_id = Number(followUpStatus);
      }
      if (followUpDetail) {
        data.follow_up_detail_id = Number(followUpDetail);
      }
      if (followUpResult) {
        data.follow_up_result_id = Number(followUpResult);
      }

      if (motorcycle) {
        data.product_preferences_id = Number(motorcycle);
      }

      if (dataUpdate) {
        data.update_data = {};
        if (formData.get('recipient_address')) {
          data.update_data.recipient_address =
            formData.get('recipient_address');
        }
        if (formData.get('sub_district')) {
          data.update_data.sub_district = formData.get('sub_district');
        }
        if (houseOwnership) {
          data.update_data.house_ownership_id = Number(houseOwnership);
        }
        if (job) {
          data.update_data.job_id = Number(job);
        }
        if (jobDetail) {
          data.update_data.recipient_job_detail = jobDetail;
        }
        if (religion) {
          data.update_data.recipient_religion = religion;
        }
        if (bornDate) {
          data.update_data.recipient_born_date = format(bornDate, 'yyyy-MM-dd');
        }
        if (hobby) {
          data.update_data.hobby_id = Number(hobby);
        }
        if (formData.get('recipient_hobby_detail')) {
          data.update_data.recipient_hobby_detail = formData.get(
            'recipient_hobby_detail'
          );
        }
        if (formData.get('amount_of_family')) {
          data.update_data.amount_of_family = Number(
            formData.get('amount_of_family')
          );
        }
        if (formData.get('amount_of_motorcycle')) {
          data.update_data.amount_of_motorcycle = Number(
            formData.get('amount_of_motorcycle')
          );
        }
        if (formData.get('facebook')) {
          data.update_data.facebook = formData.get('facebook');
        }
        if (formData.get('instagram')) {
          data.update_data.instagram = formData.get('instagram');
        }
        if (formData.get('email')) {
          data.update_data.email = formData.get('email');
        }
        if (income) {
          data.update_data.income_id = Number(income);
        }
        if (expense) {
          data.update_data.expense_id = Number(expense);
        }
        if (holiday) {
          data.update_data.holiday_id = Number(holiday);
        }
        if (religion) {
          data.update_data.religion_id = Number(religion);
        }
      }

      console.log(data);

      return addFollowUpAction(data);
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
        <Button>Tambah Follow Up</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-4xl">
        <form action={execute}>
          <AlertDialogHeader className="px-2">
            <AlertDialogTitle>Form Follow Up</AlertDialogTitle>
          </AlertDialogHeader>
          <ScrollArea>
            <div className="max-h-[600px] space-y-6">
              <div className="space-y-4 px-2">
                <h2 className="font-semibold">Penerima Telepon</h2>
                <Separator />
                <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                  <TextInput
                    label="Nama"
                    id="recipient_name"
                    placeholder="Nama Penerima Telepon"
                    className="h-10"
                  />
                  <TextInput
                    label="Keterangan Lainnya"
                    id="additional_information"
                    placeholder="Keterangan Lainnya"
                    className="h-10"
                  />
                  <SelectBox
                    options={props.relationOpts}
                    label="Hubungan Dengan Customer"
                    placeholder="Hubungan Dengan Customer"
                    id="relationship"
                    value={relation}
                    setValue={setRelation}
                  />
                  <TextInput
                    label="Whatsapp"
                    id="whatsapp_number"
                    placeholder="Whatsapp"
                    className="h-10"
                  />
                </div>
              </div>
              <div className="space-y-4 px-2">
                <h2 className="font-semibold">Follow Up</h2>
                <Separator />
                <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                  <DatePicker
                    label="Tanggal Follow Up"
                    id="follow_up_date"
                    date={fuDate}
                    setDate={setFuDate}
                  />
                  <ComboBox
                    id="product_preferences_id"
                    label="Minat Product"
                    options={props.motorcyclesOpts!}
                    placeholder="Minat Product"
                    value={motorcycle}
                    onSelect={setMotorcycle}
                  />
                  <SelectBox
                    id="follow_up_method_id"
                    label="Metode Follow Up"
                    options={props.fuMethodOpts}
                    placeholder="Metode Follow Up"
                    value={followUpMethod}
                    setValue={setFollowUpMethod}
                  />
                  <SelectBox
                    id="follow_up_result_id"
                    label="Hasil"
                    options={props.fuResultOpts}
                    placeholder="Hasil Follow Up"
                    value={followUpResult}
                    setValue={setFollowUpResult}
                  />
                  <SelectBox
                    id="follow_up_status_id"
                    label="Status Follow Up"
                    options={props.fuStatusOpts}
                    placeholder="Status Follow Up"
                    value={followUpStatus}
                    setValue={setFollowUpStatus}
                  />
                  <SelectBox
                    id="follow_up_detail_id"
                    label="Keterangan Follow Up"
                    options={props.fuDetailOpts}
                    placeholder="Keterangan Follow Up"
                    value={followUpDetail}
                    setValue={setFollowUpDetail}
                  />
                  <div className="row-span-2 h-full">
                    <TextField
                      label="Deskripsi"
                      id="follow_up_note"
                      className="h-full resize-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-4">
                <Checkbox
                  id="data-update"
                  checked={dataUpdate}
                  onCheckedChange={(value) => setDataUpdate(!!value)}
                />
                <Label
                  htmlFor="data-update"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Apakah ingin Melakukan Update Data?
                </Label>
              </div>
              {dataUpdate && (
                <div className="space-y-4 px-2">
                  <h2 className="font-semibold">Update Data</h2>
                  <Separator />
                  <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                    <TextInput
                      label="Alamat"
                      id="recipient_address"
                      placeholder="Alamat Customer"
                      className="h-10"
                    />
                    <TextInput
                      label="Kelurahan"
                      id="sub_district"
                      placeholder="Kelurahan"
                      className="h-10"
                    />
                    <DatePicker
                      label="Tanggal Lahir"
                      id="recipient_born_date"
                      date={bornDate}
                      setDate={setBornDate}
                    />
                    <SelectBox
                      label="Agama"
                      id="recipient_religion"
                      options={religions}
                      placeholder="Agama"
                      value={religion}
                      setValue={setReligion}
                    />
                    <SelectBox
                      label="Hari Besar Keagaman"
                      id="holiday_id"
                      options={props.holidayOpts}
                      placeholder="Hari Besar Keagamaan"
                      value={holiday}
                      setValue={setHoliday}
                    />
                    <SelectBox
                      label="Hobi"
                      id="hobby_id"
                      placeholder="Hobi Customer"
                      className="h-10"
                      options={props.hobbyOpts}
                      value={hobby}
                      setValue={setHobby}
                    />
                    <TextInput
                      label="Deskripsi Hobi"
                      id="recipient_hobby_detail"
                      placeholder="Deskripsi Hobi"
                      className="h-10"
                    />
                    <TextInput
                      label="Jumlah Orang Dalam 1 Rumah"
                      id="amount_of_family"
                      placeholder="Jumlah Orang Dalam 1 Rumah"
                      className="h-10"
                    />
                    <TextInput
                      label="Jumlah Sepeda Motor di Rumah"
                      id="amount_of_motorcycle"
                      placeholder="Jumlah Sepeda Motor di Rumah"
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
                      label="Deskripsi Pekerjaan"
                      id="recipent_job_detail"
                      placeholder="Deskripsi Pekerjaan"
                      className="h-10"
                      value={jobDetail}
                      onChange={(e) => setJobDetail(e.target.value)}
                    />
                    <SelectBox
                      label="Status Rumah"
                      id="house_ownership_id"
                      options={props.houseOwnershipOpts}
                      placeholder="Status Rumah"
                      value={houseOwnership}
                      setValue={setHouseOwnership}
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
                    <TextInput
                      label="Facebook"
                      id="facebook"
                      placeholder="Facebook"
                      className="h-10"
                    />
                    <TextInput
                      label="Instagram"
                      id="instagram"
                      placeholder="Instagram"
                      className="h-10"
                    />

                    <TextInput
                      label="Email"
                      id="email"
                      placeholder="email@example.com"
                      className="h-10"
                      type="email"
                    />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <AlertDialogFooter className="gap-4">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <Button type="submit" variant="blue" disabled={isPending}>
              Submit
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FollowUpDialog;
