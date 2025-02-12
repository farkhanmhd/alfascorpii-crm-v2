'use client';

import React, { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useParams, usePathname } from 'next/navigation';
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
import TextField from '@/components/elements/form/TextArea';
import { SelectOptions, OptionsProps, DealType } from '@/types';
import ImageUploadDropzone from '@/components/ImageDropzone';
import { createNewDealAction } from '@/app/lib/actions/customers/deal';
import { getErrorMessages } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import ComboBox from '../form/ComboBox';

const dealTypeOptions: SelectOptions[] = [
  {
    label: 'Unit RO',
    value: 'unit_ro',
  },
  {
    label: 'Unit Ref',
    value: 'unit_ref',
  },
  {
    label: 'Unit NC',
    value: 'unit_nc',
  },
  {
    label: 'Service',
    value: 'service',
  },
  {
    label: 'Spare Part',
    value: 'sparepart',
  },
];

const imageLabel: { [key: string]: string } = {
  unit_ro: 'Foto Pengantaran',
  unit_ref: 'Foto Pengantaran',
  unit_nc: 'Foto Pengantaran',
  service: 'Faktur Service',
  spare_part: 'Faktur Spare Part',
};

const purchaseTypes: SelectOptions[] = [
  {
    label: 'Cash',
    value: 'CASH',
  },
  {
    label: 'Credit',
    value: 'CREDIT',
  },
];

const dealStatus: SelectOptions[] = [
  {
    label: 'Approve',
    value: 'APPROVE',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Reject',
    value: 'REJECT',
  },
];

const dealTypePage: SelectOptions[] = [
  {
    label: 'Unit NC',
    value: 'unit_nc',
  },
];

const DealDialog = ({ ...props }: OptionsProps) => {
  const params = useParams();
  const pathname = usePathname();
  const id = params.id as string;
  const [dealType, setDealType] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [dealResult, setDealResult] = useState<string>('');
  const [purchaseType, setPurchaseType] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [motorcycleColor, setMotorcycleColor] = useState<string>('');
  const [relationValue, setRelationValue] = useState<string>('');
  const [customerDealName, setCustomerDealName] = useState<string>('');
  const [customerNik, setCustomerNik] = useState<string>('');
  const [dealer, setDealer] = useState<string>('');
  const [leasing, setLeasing] = useState<string>('');
  const [motorcycle, setMotorcycle] = useState<string>('');
  const [callDate, setCallDate] = useState<Date>(new Date());
  const [phone, setPhone] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [frameNumber, setFrameNumber] = useState<string>('');

  const selectedDealType = pathname.startsWith('/deal')
    ? dealTypePage
    : dealTypeOptions;

  const { execute, isPending, result } = useAction(
    async (formData) => {
      const data: DealType = {
        id: id || undefined,
        deal_type: dealType,
        call_date: format(callDate, 'yyyy-MM-dd'),
        relation_id: Number(relationValue),
        deal_customer_name: customerDealName,
        deal_customer_nik: customerNik,
        deal_customer_phone: phone,
        deal_customer_born_date: format(callDate, 'yyyy-MM-dd'),
        dealer_id: Number(dealer),
        motorcycle_id: Number(motorcycle),
        frame_number: frameNumber,
        deal_status: dealResult,
        additional_info: formData.get('additional_info'),
      };

      if (
        dealType === 'unit_ro' ||
        dealType === 'unit_ref' ||
        dealType === 'unit_nc'
      ) {
        data.purchase_date = format(callDate, 'yyyy-MM-dd');
        data.color_id = Number(motorcycleColor);
        data.leasing_id = Number(leasing);
        if (dealType !== 'unit_nc') {
          data.payment_method = purchaseType;
        }
        if (dealType === 'unit_ref' || dealType === 'unit_nc') {
          data.leasing_id = Number(leasing);
        }
      } else if (dealType === 'service') {
        data.service_date = format(callDate, 'yyyy-MM-dd');
        data.service_type_id = serviceType ? Number(serviceType) : undefined;
        data.service_price = formData.get('service_price');
      } else if (dealType === 'spare_part') {
        data.purchase_date = format(callDate, 'yyyy-MM-dd');
        data.sparepart_price = String(formData.get('sparepart_price'));
      }

      if (image) {
        data.file = image as File;
      }

      return createNewDealAction(data);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="blue" className="max-w-max self-end">
          <Plus />
          <span>Deal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="px-2">
          <DialogTitle>Form Deal</DialogTitle>
        </DialogHeader>
        <form action={execute}>
          <ScrollArea>
            <div className="max-h-[556px] space-y-6">
              <div className="space-y-4 px-2">
                <h2 className="font-semibold">Data Konsumen</h2>
                <Separator />
                <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                  <SelectBox
                    options={selectedDealType}
                    id="deal-type"
                    label="Tipe Deal Konsumen"
                    placeholder="Tipe Deal Konsumen"
                    value={dealType}
                    setValue={setDealType}
                    error={getErrorMessages(
                      result?.validationErrors?.deal_type
                    )}
                  />
                  <SelectBox
                    options={props.relationOpts}
                    id="customer-relation"
                    label="Hubungan Konsumen"
                    placeholder="Hubungan Konsumen"
                    value={relationValue}
                    setValue={setRelationValue}
                    error={getErrorMessages(
                      result?.validationErrors?.relation_id
                    )}
                  />
                  <DatePicker
                    id="call-date"
                    label="Tanggal Call"
                    date={callDate}
                    setDate={setCallDate}
                    error={getErrorMessages(
                      result?.validationErrors?.call_date
                    )}
                  />
                  <TextInput
                    id="deal_customer_name"
                    label="Nama Konsumen Deal"
                    placeholder="Nama Konsumen Deal"
                    value={customerDealName}
                    onChange={(e) => setCustomerDealName(e.target.value)}
                    error={getErrorMessages(
                      result?.validationErrors?.deal_customer_name
                    )}
                  />
                  <TextInput
                    id="deal_customer_nik"
                    label="Nomor Induk Kependudukan (NIK)"
                    placeholder="Nomor Induk Kependudukan"
                    value={customerNik}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ''
                      );
                      setCustomerNik(numericValue);
                    }}
                    inputMode="numeric"
                    error={getErrorMessages(
                      result?.validationErrors?.deal_customer_nik
                    )}
                  />
                  <TextInput
                    id="deal_customer_phone"
                    label="Nomor Handphone"
                    placeholder="08123456789"
                    value={phone}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ''
                      );
                      setPhone(numericValue);
                    }}
                    inputMode="numeric"
                    error={getErrorMessages(
                      result?.validationErrors?.deal_customer_phone
                    )}
                  />
                  <DatePicker
                    id="birth-date"
                    label="Tanggal Lahir"
                    error={getErrorMessages(
                      result?.validationErrors?.deal_customer_born_date
                    )}
                  />
                  <ComboBox
                    label="Dealer / Area"
                    id="dealer_area"
                    placeholder="Pilih Dealer/Area"
                    options={props.dealerOpts}
                    value={dealer}
                    onSelect={setDealer}
                    error={getErrorMessages(
                      result?.validationErrors?.dealer_id
                    )}
                  />
                </div>
              </div>
              {(dealType === 'unit_ro' ||
                dealType === 'unit_ref' ||
                dealType === 'unit_nc') && (
                <div className="space-y-4 px-2">
                  <h2 className="font-semibold">
                    Data Sales Unit{' '}
                    {dealType === 'unit_ref'
                      ? 'Ref'
                      : dealType === 'unit_nc' && 'NC'}
                  </h2>
                  <Separator />
                  <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                    <DatePicker
                      id="purchase-date"
                      label="Tanggal Pembelian"
                      error={getErrorMessages(
                        result?.validationErrors?.purchase_date
                      )}
                    />
                    {dealType !== 'unit_nc' && (
                      <SelectBox
                        options={dealStatus}
                        id="deal-result"
                        label="Hasil Deal"
                        placeholder="Hasil Deal"
                        value={dealResult}
                        setValue={setDealResult}
                        error={getErrorMessages(
                          result?.validationErrors?.deal_status
                        )}
                      />
                    )}
                    <SelectBox
                      options={purchaseTypes}
                      id="payment_method"
                      label="Jenis Transaksi"
                      placeholder="Jenis Transaksi"
                      value={purchaseType}
                      setValue={setPurchaseType}
                      error={getErrorMessages(
                        result?.validationErrors?.payment_method
                      )}
                    />
                    <ComboBox
                      options={props.motorcyclesOpts}
                      label="Tipe Motor"
                      id="motorcycle"
                      placeholder="Pilih Tipe Motor"
                      value={motorcycle}
                      onSelect={setMotorcycle}
                      error={getErrorMessages(
                        result?.validationErrors?.motorcycle_id
                      )}
                    />
                    <TextInput
                      id="frame_number"
                      label="Nomor Rangka"
                      placeholder="Nomor Rangka"
                      error={getErrorMessages(
                        result?.validationErrors?.frame_number
                      )}
                      value={frameNumber}
                      onChange={(e) => setFrameNumber(e.target.value)}
                    />
                    <SelectBox
                      options={props.colorOpts}
                      id="motorcycle-color"
                      label="Warna"
                      placeholder="Pilih Warna"
                      value={motorcycleColor}
                      setValue={setMotorcycleColor}
                      error={getErrorMessages(
                        result?.validationErrors?.color_id
                      )}
                    />
                    {(dealType === 'unit_ref' ||
                      dealType === 'unit_nc' ||
                      dealType === 'unit_ro') && (
                      <ComboBox
                        options={props.leasingOpts}
                        label="Leasing"
                        id="leasing"
                        placeholder="Pilih Leasing"
                        value={leasing}
                        onSelect={setLeasing}
                        error={getErrorMessages(
                          result?.validationErrors?.leasing_id
                        )}
                      />
                    )}
                    <div className="md:col-span-2">
                      <TextField
                        id="additional_info"
                        label="Keterangan"
                        placeholder="Tulis Keterangan Disini"
                        className="resize-none text-sm"
                        error={getErrorMessages(
                          result?.validationErrors?.additional_info
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
              {dealType === 'service' && (
                <div className="space-y-4 px-2">
                  <h2 className="font-semibold">Data Service</h2>
                  <Separator />
                  <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                    <DatePicker
                      id="service-date"
                      label="Tanggal Service"
                      error={getErrorMessages(
                        result?.validationErrors?.service_date
                      )}
                    />
                    <SelectBox
                      options={dealStatus}
                      id="deal-result"
                      label="Hasil Deal"
                      placeholder="Hasil Deal"
                      value={dealResult}
                      setValue={setDealResult}
                      error={getErrorMessages(
                        result?.validationErrors?.deal_status
                      )}
                    />
                    <SelectBox
                      options={props.serviceTypeOpts}
                      id="service-type"
                      label="Jenis Service"
                      placeholder="Jenis Service"
                      value={serviceType}
                      setValue={setServiceType}
                      error={getErrorMessages(
                        result?.validationErrors?.service_type_id
                      )}
                    />
                    <ComboBox
                      options={props.motorcyclesOpts}
                      label="Tipe Motor"
                      id="motorcycle"
                      placeholder="Pilih Tipe Motor"
                      value={motorcycle}
                      onSelect={setMotorcycle}
                      error={getErrorMessages(
                        result?.validationErrors?.motorcycle_id
                      )}
                    />
                    <TextInput
                      id="frame_number"
                      label="Nomor Rangka"
                      placeholder="Nomor Rangka"
                      error={getErrorMessages(
                        result?.validationErrors?.frame_number
                      )}
                      value={frameNumber}
                      onChange={(e) => setFrameNumber(e.target.value)}
                    />
                    <TextInput
                      id="service_price"
                      label="Nominal Service"
                      placeholder="Nominal Service"
                      error={getErrorMessages(
                        result?.validationErrors?.service_price
                      )}
                    />
                    <div className="md:col-span-2">
                      <TextField
                        id="additional_info"
                        label="Keterangan"
                        placeholder="Tulis Keterangan Disini"
                        className="resize-none text-sm"
                        error={getErrorMessages(
                          result?.validationErrors?.additional_info
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
              {dealType === 'sparepart' && (
                <div className="space-y-4 px-2">
                  <h2 className="font-semibold">Data Spare Part</h2>
                  <Separator />
                  <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                    <DatePicker
                      id="purchase-date"
                      label="Tanggal Pembelian"
                      error={getErrorMessages(
                        result?.validationErrors?.purchase_date
                      )}
                    />
                    <ComboBox
                      options={props.motorcyclesOpts}
                      label="Tipe Motor"
                      id="motorcycle"
                      placeholder="Pilih Tipe Motor"
                      value={motorcycle}
                      onSelect={setMotorcycle}
                      error={getErrorMessages(
                        result?.validationErrors?.motorcycle_id
                      )}
                    />
                    <TextInput
                      id="frame_number"
                      label="Nomor Rangka"
                      placeholder="Nomor Rangka"
                      error={getErrorMessages(
                        result?.validationErrors?.frame_number
                      )}
                      value={frameNumber}
                      onChange={(e) => setFrameNumber(e.target.value)}
                    />
                    <TextInput
                      id="spare_part_price"
                      label="Nominal Spare Part"
                      placeholder="Nominal Spare Part"
                      error={getErrorMessages(
                        result?.validationErrors?.sparepart_price
                      )}
                    />
                    <div className="md:col-span-2">
                      <TextField
                        id="additional_info"
                        label="Keterangan"
                        placeholder="Tulis Keterangan Disini"
                        className="resize-none text-sm"
                        error={getErrorMessages(
                          result?.validationErrors?.additional_info
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
              {dealType === 'Syariah Dana' && (
                <div className="space-y-4 px-2">
                  <h2 className="font-semibold">Data Syariah Dana</h2>
                  <Separator />
                  <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                    <DatePicker
                      id="purchase-date"
                      label="Tanggal Pembelian"
                      error={getErrorMessages(
                        result?.validationErrors?.purchase_date
                      )}
                    />
                    <SelectBox
                      options={dealStatus}
                      id="deal-result"
                      label="Hasil Deal"
                      placeholder="Hasil Deal"
                      value={dealResult}
                      setValue={setDealResult}
                      error={getErrorMessages(
                        result?.validationErrors?.deal_status
                      )}
                    />
                    <SelectBox
                      options={purchaseTypes}
                      id="purchase-type"
                      label="Jenis Transaksi"
                      placeholder="Jenis Transaksi"
                      value={purchaseType}
                      setValue={setPurchaseType}
                      error={getErrorMessages(
                        result?.validationErrors?.payment_method
                      )}
                    />
                    <ComboBox
                      options={props.motorcyclesOpts}
                      label="Tipe Motor"
                      id="motorcycle"
                      placeholder="Pilih Tipe Motor"
                      value={motorcycle}
                      onSelect={setMotorcycle}
                      error={getErrorMessages(
                        result?.validationErrors?.motorcycle_id
                      )}
                    />
                    <TextInput
                      id="frame_number"
                      label="Nomor Rangka"
                      placeholder="Nomor Rangka"
                      error={getErrorMessages(
                        result?.validationErrors?.frame_number
                      )}
                      value={frameNumber}
                      onChange={(e) => setFrameNumber(e.target.value)}
                    />
                    <SelectBox
                      options={props.colorOpts}
                      id="motorcycle-color"
                      label="Warna"
                      placeholder="Pilih Warna"
                      value={motorcycleColor}
                      setValue={setMotorcycleColor}
                      error={getErrorMessages(
                        result?.validationErrors?.color_id
                      )}
                    />
                    <div className="md:col-span-2">
                      <TextField
                        id="additional_info"
                        label="Keterangan"
                        placeholder="Tulis Keterangan Disini"
                        className="resize-none text-sm"
                        error={getErrorMessages(
                          result?.validationErrors?.additional_info
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}
              {dealType && (
                <ImageUploadDropzone
                  label={imageLabel[dealType]}
                  image={image}
                  setImage={setImage}
                  error={getErrorMessages(result?.validationErrors?.file)}
                />
              )}
            </div>
          </ScrollArea>
          <DialogFooter className="gap-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="blue" disabled={isPending} type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DealDialog;
