'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import { SelectBox } from '@/components/elements/form/Select';
import { Separator } from '@/components/ui/separator';
import DatePicker from '@/components/elements/form/DatePicker';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scrollarea';
import TextInput from '@/components/elements/form/TextInput';
import { usePermissions } from '@/hooks';
import { checkPermission } from '@/lib/utils';
import { IFollowUpRecipient, OptionsProps, ICustomer } from '@/types';
import { updateRecipientAction } from '@/app/lib/actions/customers';
import { useAction } from 'next-safe-action/hooks';
import { toast } from '@/hooks/use-toast';
import { RecipientData } from '@/app/lib/data/customers';
import { format } from 'date-fns';

type Props = {
  recipient: IFollowUpRecipient;
  customer: ICustomer;
} & OptionsProps;

const PhoneReceiverDialog = ({ ...props }: Props) => {
  const { permissions } = usePermissions();
  const canEdit = checkPermission(
    'service_fu_edit_recipient_data',
    permissions
  );

  const [dateOfBirth, setDateOfBirth] = useState<Date>(
    props.customer.follow_up_recipient.recipient_born_date
      ? new Date(props.customer.follow_up_recipient.recipient_born_date)
      : new Date()
  );

  const [relation, setRelation] = useState<string>(() => {
    const matchingOption = props.relationOpts.find(
      (option) => option.label === props.recipient.relationship
    );
    return matchingOption ? matchingOption.value : props.relationOpts[0].value;
  });

  const [holiday, setHoliday] = useState<string>(() => {
    const matchingOption = props.holidayOpts.find(
      (option) => option.label === props.customer.holiday
    );
    return matchingOption ? matchingOption.value : props.holidayOpts[0].value;
  });

  const [houseOwnership, setHouseOwnership] = useState<string>(() => {
    const matchingOption = props.houseOwnershipOpts.find(
      (option) => option.label === props.customer.house_ownership
    );
    return matchingOption
      ? matchingOption.value
      : props.houseOwnershipOpts[0].value;
  });

  const [job, setJob] = useState<string>(() => {
    const matchingOption = props.jobOpts.find(
      (option) => option.label === props.customer.job
    );
    return matchingOption ? matchingOption.value : props.jobOpts[0].value;
  });

  const [income, setIncome] = useState<string>(() => {
    const matchingOption = props.incomeOpts.find(
      (option) => option.label === props.customer.income
    );
    return matchingOption ? matchingOption.value : props.incomeOpts[0].value;
  });

  const [expense, setExpense] = useState<string>(() => {
    const matchingOption = props.expenseOpts.find(
      (option) => option.label === props.customer.expense
    );
    return matchingOption ? matchingOption.value : props.expenseOpts[0].value;
  });

  const [hobby, setHobby] = useState<string>(() => {
    const matchingOption = props.hobbyOpts.find(
      (option) => option.label === props.customer.hobby
    );
    return matchingOption ? matchingOption.value : props.hobbyOpts[0].value;
  });

  const [recipientName, setRecipientName] = useState<string>(
    props.recipient.recipient_name || ''
  );
  const [additionalInformation, setAdditionalInformation] = useState<string>(
    props.recipient.additional_information || ''
  );

  const [customerName, setCustomerName] = useState<string>(
    props.customer.customer_name || ''
  );
  const [recipientAddress, setRecipientAddress] = useState<string>(
    props.customer.customer_address || ''
  );
  const [subDistrict, setSubDistrict] = useState<string>(
    props.customer.sub_district || ''
  );
  const [customerDistrict, setCustomerDistrict] = useState<string>(
    props.customer.district || ''
  );
  const [customerHobbyDescription, setCustomerHobbyDescription] =
    useState<string>(props.customer.hobby_description || '');
  const [customerCityRegency, setCustomerCityRegency] = useState<string>(
    props.customer.regency_or_city || ''
  );
  const [familyCount, setFamilyCount] = useState<string>(
    String(props.customer.amount_of_family || '')
  );
  const [customerProvince, setCustomerProvince] = useState<string>(
    props.customer.province || ''
  );
  const [motorcycleCount, setMotorcycleCount] = useState<string>(
    String(props.customer.amount_of_motorcycle || '')
  );
  const [postalCode, setPostalCode] = useState<string>(
    props.customer.postal_code || ''
  );
  const [facebook, setFacebook] = useState<string>(
    props.customer.facebook || ''
  );
  const [instagram, setInstagram] = useState<string>(
    props.customer.instagram || ''
  );
  const [jobDescription, setJobDescription] = useState<string>(
    props.customer.job_description || ''
  );

  const [whatsapp, setWhatsapp] = useState<string>(
    props.customer.whatsapp_number || ''
  );
  const [mobilePhone, setMobilePhone] = useState<string>(
    props.customer.mobile_phone || ''
  );

  const [open, setOpen] = useState(false);

  const { execute, isPending } = useAction(
    async (formData) => {
      const data: Partial<RecipientData> = {
        customer_id: String(props.customer.id),
      };
      const addIfValue = (key: keyof RecipientData, value: any) => {
        if (value !== null && value !== '') {
          data[key] = value;
        }
      };

      addIfValue('recipient_name', recipientName);
      addIfValue('additional_information', additionalInformation);
      addIfValue('relation_id', String(relation));
      addIfValue('whatsapp_number', whatsapp);
      addIfValue('recipient_born_date', format(dateOfBirth, 'yyyy-MM-dd'));
      addIfValue('recipient_address', recipientAddress);
      addIfValue('sub_district', subDistrict);
      addIfValue('house_ownership_id', Number(houseOwnership) || undefined);
      addIfValue('job_id', Number(job) || undefined);
      addIfValue('recipient_job_detail', formData.get('job_description'));
      addIfValue('hobby_id', Number(hobby));
      addIfValue(
        'recipient_hobby_detail',
        formData.get('customer-hobby-description')
      );
      addIfValue('amount_of_family', Number(familyCount) || undefined);
      addIfValue('amount_of_motorcycle', Number(motorcycleCount) || undefined);
      addIfValue('facebook', facebook);
      addIfValue('instagram', instagram);
      addIfValue('email', formData.get('email'));
      addIfValue('income_id', Number(income) || undefined);
      addIfValue('expense_id', Number(expense) || undefined);
      addIfValue('holiday_id', Number(holiday) || undefined);

      return updateRecipientAction(data as any);
    },
    {
      onSuccess: (actionResult) => {
        toast({
          title: 'Result',
          description: actionResult?.data?.message,
          variant:
            actionResult?.data?.status === 'success'
              ? 'default'
              : 'destructive',
        });
        setOpen(false);
      },
    }
  );

  if (!canEdit) return null;
  return (
    <Dialog open={open || isPending} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="blue">Update Data</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <form action={execute}>
          <DialogHeader className="px-2">
            <DialogTitle>Form Penerima Telepon</DialogTitle>
          </DialogHeader>
          <ScrollArea className="py-6">
            <div className="max-h-[556px] space-y-6">
              <div className="space-y-4 px-2">
                <h2 className="font-semibold">Penerima Telepon</h2>
                <Separator />
                <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                  <TextInput
                    label="Nama"
                    id="recipient_name"
                    placeholder="Nama Penerima Telepon"
                    className="h-10"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                  <TextInput
                    label="Keterangan Lainnya"
                    id="additional_information"
                    placeholder="Keterangan Lainnya"
                    className="h-10"
                    value={additionalInformation}
                    onChange={(e) => setAdditionalInformation(e.target.value)}
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
                <h2 className="font-semibold">Update Data</h2>
                <Separator />
                <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                  <DatePicker
                    label="Tanggal Lahir"
                    id="date_of_birth"
                    date={dateOfBirth}
                    setDate={setDateOfBirth}
                  />
                  <TextInput
                    label="Nama"
                    id="customer-name"
                    placeholder="Nama Customer"
                    className="h-10"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                  <TextInput
                    label="Nomor HP"
                    id="cellphone-number"
                    placeholder="Nomor HP"
                    className="h-10"
                    value={mobilePhone}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ''
                      );
                      setMobilePhone(numericValue);
                    }}
                  />
                  <TextInput
                    label="Alamat"
                    id="recipient_address"
                    placeholder="Alamat Customer"
                    className="h-10"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                  />
                  <SelectBox
                    label="Hari Besar Keagamaan"
                    id="hari-besar"
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
                    value={subDistrict}
                    onChange={(e) => setSubDistrict(e.target.value)}
                  />
                  <SelectBox
                    label="Hobi Customer"
                    id="hobby_id"
                    options={props.hobbyOpts}
                    placeholder="Hobi Customer"
                    value={hobby}
                    setValue={setHobby}
                  />
                  <TextInput
                    label="Kecamatan"
                    id="customer-district"
                    placeholder="Kecamatan"
                    className="h-10"
                    value={customerDistrict}
                    onChange={(e) => setCustomerDistrict(e.target.value)}
                  />
                  <TextInput
                    label="Deskripsi Hobi"
                    id="customer-hobby-description"
                    placeholder="Deskripsi Hobi"
                    className="h-10"
                    value={customerHobbyDescription}
                    onChange={(e) =>
                      setCustomerHobbyDescription(e.target.value)
                    }
                  />
                  <TextInput
                    label="Kabupaten / Kota"
                    id="customer-city-regency"
                    placeholder="Kabupaten / Kota"
                    className="h-10"
                    value={customerCityRegency}
                    onChange={(e) => setCustomerCityRegency(e.target.value)}
                  />
                  <TextInput
                    label="Jumlah Orang Dalam 1 Rumah"
                    id="family-count"
                    placeholder="Jumlah Orang Dalam 1 Rumah"
                    className="h-10"
                    value={familyCount}
                    onChange={(e) => {
                      setFamilyCount(e.target.value.replace(/[^0-9]/g, ''));
                    }}
                  />
                  <TextInput
                    label="Provinsi"
                    id="customer-province"
                    placeholder="Provinsi"
                    className="h-10"
                    value={customerProvince}
                    onChange={(e) => setCustomerProvince(e.target.value)}
                  />
                  <TextInput
                    label="Jumlah Sepeda Motor di Rumah"
                    id="motorcycle-count"
                    placeholder="Jumlah Sepeda Motor di Rumah"
                    className="h-10"
                    value={motorcycleCount}
                    onChange={(e) => {
                      setMotorcycleCount(e.target.value.replace(/[^0-9]/g, ''));
                    }}
                  />
                  <TextInput
                    label="Kode Pos"
                    id="postal-code"
                    placeholder="Kode Pos"
                    className="h-10"
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value.replace(/[^0-9]/g, ''));
                    }}
                  />
                  <TextInput
                    label="Facebook"
                    id="facebook"
                    placeholder="Facebook"
                    className="h-10"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                  />
                  <SelectBox
                    label="Status Rumah"
                    id="house-ownership"
                    options={props.houseOwnershipOpts}
                    placeholder="Status Rumah"
                    value={houseOwnership}
                    setValue={setHouseOwnership}
                  />
                  <TextInput
                    label="Instagram"
                    id="instagram"
                    placeholder="Instagram"
                    className="h-10"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                  <SelectBox
                    label="Pekerjaan"
                    id="customer-job"
                    options={props.jobOpts}
                    placeholder="Pekerjaan"
                    value={job}
                    setValue={setJob}
                  />

                  <SelectBox
                    label="Penghasilan / Bulan"
                    id="income"
                    options={props.incomeOpts}
                    placeholder="Penghasilan / Bulan"
                    value={income}
                    setValue={setIncome}
                  />
                  <TextInput
                    label="Deskripsi Pekerjaan"
                    id="job_description"
                    placeholder="Deskripsi Pekerjaan"
                    className="h-10"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <SelectBox
                    label="Pengeluaran / Bulan"
                    id="expense"
                    options={props.expenseOpts}
                    placeholder="Pengeluaran / Bulan"
                    value={expense}
                    setValue={setExpense}
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="gap-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="blue" disabled={isPending}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneReceiverDialog;
