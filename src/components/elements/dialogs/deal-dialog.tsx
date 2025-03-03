'use client';

import React, { useState, useEffect } from 'react';
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
import { checkPermission, getErrorMessages } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { usePermissions } from '@/hooks';
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

const dealTypePage: SelectOptions[] = [
  {
    label: 'Unit NC',
    value: 'unit_nc',
  },
];

const DealDialog = ({ ...props }: OptionsProps) => {
  const pathname = usePathname();
  const { permissions } = usePermissions();

  const filteredDealers = props.dealerOpts.filter(
    (dealer) => dealer.value !== 'all'
  );
  const filteredMotorcycles = props.motorcyclesOpts.filter(
    (motorcycle) => motorcycle.value !== 'all'
  );

  const canAddDeal = pathname.startsWith('/customers')
    ? checkPermission('sales_fu_add_deal_from_follow_up', permissions)
    : checkPermission('add_deal', permissions);

  const params = useParams();

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
  const [callDate, setCallDate] = useState<Date | undefined>(new Date());
  const [bornDate, setBornDate] = useState<Date | undefined>(new Date());
  const [phone, setPhone] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [frameNumber, setFrameNumber] = useState<string>('');
  const [sparePartPrice, setSparePartPrice] = useState<string>('');
  const [servicePrice, setServicePrice] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());

  const selectedDealType = pathname.startsWith('/deal')
    ? dealTypePage
    : dealTypeOptions;

  // ...existing code in your useAction callback before modifications...

  const { execute, isPending, result } = useAction(
    async (formData) => {
      // Initialize data without setting additional_info directly.
      const data: DealType = {
        deal_type: dealType,
        call_date: format(callDate as Date, 'yyyy-MM-dd'),
        deal_customer_name: formData.get('deal_customer_name'),
        deal_customer_nik: customerNik,
        deal_customer_phone: phone,
        deal_customer_born_date: format(bornDate as Date, 'yyyy-MM-dd'),
      };

      if (image) {
        data.file = image;
      }

      if (dealType === 'unit_ro' || (dealType === 'unit_ref' && dealResult)) {
        data.deal_status = dealResult;
        data.purchase_date = format(purchaseDate, 'yyyy-MM-dd');
      }

      if (purchaseType === 'CREDIT') {
        data.leasing_id = Number(leasing);
      }

      if (dealType !== 'unit_nc') {
        data.id = id;
      }

      const addIfNotEmpty = <K extends keyof DealType>(
        key: K,
        rawValue: any,
        transform: (v: any) => DealType[K] = (v) => v
      ) => {
        if (rawValue !== '') {
          data[key] = transform(rawValue);
        }
      };

      addIfNotEmpty('dealer_id', dealer, (v) => Number(v));
      addIfNotEmpty('motorcycle_id', motorcycle, (v) => Number(v));
      addIfNotEmpty('sparepart_price', sparePartPrice, (v) => String(v));
      addIfNotEmpty('service_price', servicePrice, (v) => String(v));
      addIfNotEmpty('frame_number', frameNumber, (v) => String(v));
      addIfNotEmpty('color_id', motorcycleColor, (v) => Number(v));
      addIfNotEmpty('payment_method', purchaseType, (v) => String(v));
      addIfNotEmpty('leasing_id', leasing, (v) => Number(v));
      addIfNotEmpty('relation_id', relationValue, (v) => Number(v));
      addIfNotEmpty('additional_info', formData.get('additional_info'), (v) =>
        String(v)
      );
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

  useEffect(() => {
    if (
      dealType === 'unit_ro' ||
      dealType === 'service' ||
      dealType === 'sparepart'
    ) {
      setCustomerDealName(props.customer?.customer_name!);
      setCustomerNik(props.customer?.nik!);
      setPhone(props.customer?.mobile_phone!);
      setBornDate(new Date(props.customer?.date_of_birth!));
    } else {
      setCustomerDealName('');
      setCustomerNik('');
      setPhone('');
    }
  }, [dealType]);

  if (!canAddDeal) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="blue" className="w-full self-end md:max-w-max">
          <Plus />
          <span>Deal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="px-2">
          <DialogTitle>Form Deal</DialogTitle>
        </DialogHeader>
        <form action={execute}>
          <ScrollArea className="pb-6">
            <div className="max-h-[800px] space-y-6">
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
                  />
                  <DatePicker
                    id="call-date"
                    label="Tanggal Call"
                    date={callDate}
                    setDate={setCallDate}
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
                    date={bornDate}
                    setDate={setBornDate}
                  />
                  <ComboBox
                    label="Dealer / Area"
                    id="dealer_area"
                    placeholder="Pilih Dealer/Area"
                    options={filteredDealers}
                    value={dealer}
                    onSelect={setDealer}
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
                      date={purchaseDate}
                      setDate={setPurchaseDate}
                    />
                    {dealType !== 'unit_nc' && (
                      <SelectBox
                        options={props.fuResultOpts}
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
                    />
                    <ComboBox
                      options={filteredMotorcycles}
                      label="Tipe Motor"
                      id="motorcycle"
                      placeholder="Pilih Tipe Motor"
                      value={motorcycle}
                      onSelect={setMotorcycle}
                    />
                    <TextInput
                      id="frame_number"
                      label="Nomor Rangka"
                      placeholder="Nomor Rangka"
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
                    />
                    {(dealType === 'unit_ref' ||
                      dealType === 'unit_nc' ||
                      dealType === 'unit_ro') &&
                      purchaseType === 'CREDIT' && (
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
                    <DatePicker id="service-date" label="Tanggal Service" />
                    <SelectBox
                      options={props.serviceTypeOpts}
                      id="service-type"
                      label="Jenis Service"
                      placeholder="Jenis Service"
                      value={serviceType}
                      setValue={setServiceType}
                    />
                    <ComboBox
                      options={props.motorcyclesOpts}
                      label="Tipe Motor"
                      id="motorcycle"
                      placeholder="Pilih Tipe Motor"
                      value={motorcycle}
                      onSelect={setMotorcycle}
                    />
                    <TextInput
                      id="frame_number"
                      label="Nomor Rangka"
                      placeholder="Nomor Rangka"
                      value={frameNumber}
                      onChange={(e) => setFrameNumber(e.target.value)}
                    />
                    <TextInput
                      id="service_price"
                      label="Nominal Service"
                      placeholder="Nominal Service"
                      value={servicePrice}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ''
                        );
                        setServicePrice(numericValue);
                      }}
                      inputMode="numeric"
                    />
                    <div className="md:col-span-2">
                      <TextField
                        id="additional_info"
                        label="Keterangan"
                        placeholder="Tulis Keterangan Disini"
                        className="resize-none text-sm"
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
                    <DatePicker id="purchase-date" label="Tanggal Pembelian" />
                    <ComboBox
                      options={props.motorcyclesOpts}
                      label="Tipe Motor"
                      id="motorcycle"
                      placeholder="Pilih Tipe Motor"
                      value={motorcycle}
                      onSelect={setMotorcycle}
                    />
                    <TextInput
                      id="frame_number"
                      label="Nomor Rangka"
                      placeholder="Nomor Rangka"
                      value={frameNumber}
                      onChange={(e) => setFrameNumber(e.target.value)}
                    />
                    <TextInput
                      id="spare_part_price"
                      label="Nominal Spare Part"
                      placeholder="Nominal Spare Part"
                      value={sparePartPrice}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(
                          /[^0-9]/g,
                          ''
                        );
                        setSparePartPrice(numericValue);
                      }}
                      inputMode="numeric"
                    />
                    <div className="md:col-span-2">
                      <TextField
                        id="additional_info"
                        label="Keterangan"
                        placeholder="Tulis Keterangan Disini"
                        className="resize-none text-sm"
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
                    <DatePicker id="purchase-date" label="Tanggal Pembelian" />
                    <SelectBox
                      options={props.fuResultOpts}
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
                    />
                    <ComboBox
                      options={props.motorcyclesOpts}
                      label="Tipe Motor"
                      id="motorcycle"
                      placeholder="Pilih Tipe Motor"
                      value={motorcycle}
                      onSelect={setMotorcycle}
                    />
                    <TextInput
                      id="frame_number"
                      label="Nomor Rangka"
                      placeholder="Nomor Rangka"
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
                    />
                    <div className="md:col-span-2">
                      <TextField
                        id="additional_info"
                        label="Keterangan"
                        placeholder="Tulis Keterangan Disini"
                        className="resize-none text-sm"
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
