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
import { ICustomer, SelectOptions } from '@/types';
import ComboBox from '@/components/elements/form/ComboBox';
import { toast } from '@/hooks/use-toast';
import { checkPermission } from '@/lib/utils';
import { FollowUpData } from '@/app/lib/data/follow-up';
import { usePermissions } from '@/hooks';

interface ExtendedFuDetailProp extends SelectOptions {
  detail: 'CONTACTED' | 'NOT CONTACTED';
}

type Props = {
  motorcyclesOpts: SelectOptions[];
  holidayOpts: SelectOptions[];
  jobOpts: SelectOptions[];
  relationOpts: SelectOptions[];
  fuDetailOpts: ExtendedFuDetailProp[];
  fuResultOpts: SelectOptions[];
  fuMethodOpts: SelectOptions[];
  fuStatusOpts: SelectOptions[];
  incomeOpts: SelectOptions[];
  expenseOpts: SelectOptions[];
  hobbyOpts: SelectOptions[];
  houseOwnershipOpts: SelectOptions[];
  customer: ICustomer;
};

const FollowUpDialog = ({ ...props }: Props) => {
  const { permissions } = usePermissions();

  const canFollowUp = checkPermission('sales_fu_add_follow_up', permissions);

  if (!canFollowUp) return null;

  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [dataUpdate, setDataUpdate] = useState<boolean>(false);
  const [relation, setRelation] = useState(props.relationOpts[0].value);
  const [motorcycle, setMotorcycle] = useState('');
  const [followUpDetail, setFollowUpDetail] = useState('');
  const [followUpResult, setFollowUpResult] = useState('');
  const [followUpMethod, setFollowUpMethod] = useState('');
  const [followUpStatus, setFollowUpStatus] = useState('');
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [hobby, setHobby] = useState('');
  const [houseOwnership, setHouseOwnership] = useState('');
  const [job, setJob] = useState('');
  const [holiday, setHoliday] = useState('');
  const [fuDate, setFuDate] = useState<Date>(new Date());
  const [bornDate, setBornDate] = useState<Date>(
    new Date(props.customer.date_of_birth) || new Date()
  );
  const [jobDetail, setJobDetail] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>(
    props.customer.mobile_phone || ''
  );
  const [amountFamily, setAmountFamily] = useState<number>(
    props.customer.amount_of_family || 0
  );
  const [amountMotorcycle, setAmountMotorcycle] = useState<number>(
    props.customer.amount_of_motorcycle || 0
  );

  const { execute, isPending } = useAction(
    async (formData) => {
      const data = {
        customer_id: Number(params.id),
      } as FollowUpData;
      const addIfNotEmpty = <K extends keyof FollowUpData>(
        key: K,
        rawValue: any,
        transform: (v: any) => FollowUpData[K] = (v) => v
      ) => {
        if (rawValue !== '') {
          data[key] = transform(rawValue);
        }
      };

      addIfNotEmpty('recipient_name', formData.get('recipient_name'));
      addIfNotEmpty('relation_id', relation, (v) => Number(v));
      addIfNotEmpty('whatsapp_number', formData.get('whatsapp_number'));
      addIfNotEmpty(
        'additional_information',
        formData.get('additional_information')
      );
      addIfNotEmpty('follow_up_date', format(fuDate, 'yyyy-MM-dd'));
      addIfNotEmpty('follow_up_method_id', followUpMethod, (v) => Number(v));
      addIfNotEmpty('follow_up_status_id', followUpStatus, (v) => Number(v));
      addIfNotEmpty('follow_up_detail_id', followUpDetail, (v) => Number(v));
      addIfNotEmpty('follow_up_result_id', followUpResult, (v) => Number(v));
      addIfNotEmpty('follow_up_note', formData.get('follow_up_note'));
      addIfNotEmpty('product_preferences_id', motorcycle, (v) => Number(v));

      // For update_data if dataUpdate is true
      if (dataUpdate) {
        data.update_data = {};
        const update = data.update_data;

        const addIfNotEmptyUpdate = (
          key: keyof NonNullable<FollowUpData['update_data']>,
          rawValue: any,
          transform: (v: any) => any = (v) => v
        ) => {
          if (rawValue !== '') {
            update[key] = transform(rawValue);
          }
        };

        addIfNotEmptyUpdate(
          'recipient_address',
          formData.get('recipient_address')
        );
        addIfNotEmptyUpdate('sub_district', formData.get('sub_district'));
        addIfNotEmptyUpdate('house_ownership_id', houseOwnership, (v) =>
          Number(v)
        );
        addIfNotEmptyUpdate('job_id', job, (v) => Number(v));
        addIfNotEmptyUpdate('recipient_job_detail', jobDetail);
        addIfNotEmptyUpdate(
          'recipient_born_date',
          format(bornDate, 'yyyy-MM-dd')
        );
        addIfNotEmptyUpdate('hobby_id', hobby, (v) => Number(v));
        addIfNotEmptyUpdate(
          'recipient_hobby_detail',
          formData.get('recipient_hobby_detail')
        );
        addIfNotEmptyUpdate(
          'amount_of_family',
          formData.get('amount_of_family'),
          (v) => Number(v)
        );
        addIfNotEmptyUpdate(
          'amount_of_motorcycle',
          formData.get('amount_of_motorcycle'),
          (v) => Number(v)
        );
        addIfNotEmptyUpdate('facebook', formData.get('facebook'));
        addIfNotEmptyUpdate('instagram', formData.get('instagram'));
        addIfNotEmptyUpdate('email', formData.get('email'));
        addIfNotEmptyUpdate('income_id', income, (v) => Number(v));
        addIfNotEmptyUpdate('expense_id', expense, (v) => Number(v));
        addIfNotEmptyUpdate('holiday_id', holiday, (v) => Number(v));
      }

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
                    defaultValue={props.customer.customer_name}
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
                    value={whatsapp}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ''
                      );
                      setWhatsapp(numericValue);
                    }}
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
                    options={
                      followUpStatus === '1'
                        ? props.fuDetailOpts.filter(
                            (opt) => opt.detail === 'CONTACTED'
                          )
                        : followUpStatus === '2'
                          ? props.fuDetailOpts.filter(
                              (opt) => opt.detail === 'NOT CONTACTED'
                            )
                          : []
                    }
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
                      defaultValue={props.customer.customer_address}
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
                      id="sub_district"
                      placeholder="Kelurahan"
                      className="h-10"
                      defaultValue={props.customer.sub_district}
                    />
                    <TextInput
                      label="Jumlah Orang Dalam 1 Rumah"
                      id="amount_of_family"
                      placeholder="Jumlah Orang Dalam 1 Rumah"
                      className="h-10"
                      value={amountFamily}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ''
                        );
                        setAmountFamily(Number(numericValue));
                      }}
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
                      label="Jumlah Sepeda Motor di Rumah"
                      id="amount_of_motorcycle"
                      placeholder="Jumlah Sepeda Motor di Rumah"
                      className="h-10"
                      value={amountMotorcycle}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ''
                        );
                        setAmountMotorcycle(Number(numericValue));
                      }}
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
                      label="Facebook"
                      id="facebook"
                      placeholder="Facebook"
                      className="h-10"
                    />
                    <TextInput
                      label="Deskripsi Pekerjaan"
                      id="recipent_job_detail"
                      placeholder="Deskripsi Pekerjaan"
                      className="h-10"
                      value={jobDetail}
                      onChange={(e) => setJobDetail(e.target.value)}
                    />
                    <TextInput
                      label="Instagram"
                      id="instagram"
                      placeholder="Instagram"
                      className="h-10"
                    />
                    <DatePicker
                      label="Tanggal Lahir"
                      id="recipient_born_date"
                      date={bornDate}
                      setDate={setBornDate}
                    />
                    <TextInput
                      label="Email"
                      id="email"
                      placeholder="email@example.com"
                      className="h-10"
                      type="email"
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
                    <SelectBox
                      label="Penghasilan / Bulan"
                      id="income_id"
                      options={props.incomeOpts}
                      placeholder="Penghasilan / Bulan"
                      value={income}
                      setValue={setIncome}
                    />
                    <TextInput
                      label="Deskripsi Hobi"
                      id="recipient_hobby_detail"
                      placeholder="Deskripsi Hobi"
                      className="h-10"
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
