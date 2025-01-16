'use client';

import React, { useState, useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Plus } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { getDealerList } from '@/app/lib/actions/dealers';
import { getMotorcycleList } from '@/app/lib/actions/motorcycles';
import { getLeasingList } from '@/app/lib/actions/leasing';

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
import { Checkbox } from '@/components/ui/checkbox';
import { ComboBoxOptions, SelectOptions } from '@/types';
import { Label } from '@/components/ui/label';
import ComboBox from '@/components/elements/form/ComboBox';
import ImageUploadDropzone from '@/components/ImageDropzone';

const dealTypeOptions: SelectOptions[] = [
  {
    label: 'Unit RO',
    value: 'Unit RO',
  },
  {
    label: 'Unit Ref',
    value: 'Unit Ref',
  },
  {
    label: 'Unit NC',
    value: 'Unit NC',
  },
  {
    label: 'Service',
    value: 'Service',
  },
  {
    label: 'Spare Part',
    value: 'Spare Part',
  },
  {
    label: 'Syariah Dana',
    value: 'Syariah Dana',
  },
];

const imageLabel: { [key: string]: string } = {
  'Unit RO': 'Foto Pengantaran',
  'Unit Ref': 'Foto Pengantaran',
  'Unit NC': 'Foto Pengantaran',
  Service: 'Faktur Service',
  'Spare Part': 'Faktur Spare Part',
  'Syariah Dana': 'Foto Pengantaran',
};

const purchaseTypes: SelectOptions[] = [
  {
    label: 'Cash',
    value: 'Cash',
  },
  {
    label: 'Credit',
    value: 'Credit',
  },
];

const dealResults: SelectOptions[] = [
  {
    label: 'Approve',
    value: 'Approve',
  },
  {
    label: 'Pending',
    value: 'Pending',
  },
  {
    label: 'Reject',
    value: 'Reject',
  },
];

const motorcycleColors: SelectOptions[] = [
  {
    label: 'Hitam',
    value: 'Hitam',
  },
  {
    label: 'Merah',
    value: 'Merah',
  },
  {
    label: 'Biru',
    value: 'Biru',
  },
  {
    label: 'Putih',
    value: 'Putih',
  },
];
const serviceTypes: SelectOptions[] = [
  {
    label: 'Ganti Kampas Rem Depan',
    value: 'Ganti Kampas Rem Depan',
  },
  {
    label: 'Ganti Kampas Rem Belakang',
    value: 'Ganti Kampas Rem Belakang',
  },
  {
    label: 'Paket Service Injeksi',
    value: 'Paket Service Injeksi',
  },
  {
    label: 'Paket Service CVT',
    value: 'Paket Service CVT',
  },
  {
    label: 'Service Ringan',
    value: 'Service Ringan',
  },
  {
    label: 'Service Besar',
    value: 'Service Besar',
  },
  {
    label: 'Ganti Oli',
    value: 'Ganti Oli',
  },
  {
    label: 'SKY',
    value: 'SKY',
  },
  {
    label: 'KSG',
    value: 'KSG',
  },
  {
    label: 'Lainnya',
    value: 'Lainnya',
  },
];

const customerRelations: SelectOptions[] = [
  {
    label: 'Konsumen Langsung',
    value: 'Konsumen Langsung',
  },
  {
    label: 'Ibu-Anak',
    value: 'Ibu-Anak',
  },
  {
    label: 'Ayah-Anak',
    value: 'Ayah-Anak',
  },
  {
    label: 'Suami-Istri',
    value: 'Suami-Istri',
  },
  {
    label: 'Kakak-Adik',
    value: 'Kakak-Adik',
  },
  {
    label: 'Tetangga',
    value: 'Tetangga',
  },
  {
    label: 'Saudara',
    value: 'Saudara',
  },
  {
    label: 'Teman',
    value: 'Teman',
  },
  {
    label: 'Lainnya',
    value: 'Lainnya',
  },
  {
    label: 'Tante-Ponakan',
    value: 'Tante-Ponakan',
  },
  {
    label: 'Paman-Ponakan',
    value: 'Paman-Ponakan',
  },
  {
    label: 'Anak',
    value: 'Anak',
  },
];

const DealDialog = () => {
  const [dealType, setDealType] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [dealResult, setDealResult] = useState<string>('');
  const [purchaseType, setPurchaseType] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [motorcycleColor, setMotorcycleColor] = useState<string>('');
  const [relationValue, setRelationValue] = useState<string>('');
  const [customerDealName, setCustomerDealName] = useState<string>('');
  const [customerNameBefore, setCustomerNameBefore] = useState<string>('John');
  const [customerNik, setCustomerNik] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [dealerOptions, setDealerOptions] = useState<ComboBoxOptions[]>([]);
  const [leasingOptions, setLeasingOptions] = useState<ComboBoxOptions[]>([]);
  const [dealerInput, setDealerInput] = useState<string>('');
  const [leasingInput, setLeasingInput] = useState<string>('');
  const [motorcycleInput, setMotorcycleInput] = useState<string>('');
  const [motorcycleOptions, setMotorcycleOptions] = useState<ComboBoxOptions[]>(
    []
  );

  const handleCustomerCheck = () => {
    if (customerNameBefore === customerDealName) {
      setCustomerDealName('');
    } else {
      setCustomerDealName(customerNameBefore);
    }
  };

  const { execute, result, isPending } = useAction(() => {
    return getMotorcycleList({ search: motorcycleInput });
  });

  const {
    execute: executeDealer,
    result: resultDealer,
    isPending: isPendingDealer,
  } = useAction(() => {
    return getDealerList({ search: dealerInput });
  });

  const {
    execute: executeLeasing,
    result: resultLeasing,
    isPending: isPendingLeasing,
  } = useAction(() => {
    return getLeasingList({ search: leasingInput });
  });

  const handleMotorcycleSearch = useDebouncedCallback((term: string) => {
    execute({ search: term });
    setIsTyping(false);
  }, 300);

  const handleDealerSearch = useDebouncedCallback((term: string) => {
    executeDealer({ search: term });
    setIsTyping(false);
  }, 300);

  const handleLeasingSearch = useDebouncedCallback((term: string) => {
    executeLeasing({ search: term });
    setIsTyping(false);
  }, 300);

  const onMotorcycleChange = (term: string) => {
    setIsTyping(true);
    setMotorcycleInput(term);
    handleMotorcycleSearch(term);
  };

  const onDealerChange = (term: string) => {
    setIsTyping(true);
    setDealerInput(term);
    handleDealerSearch(term);
  };
  const onLeasingChange = (term: string) => {
    setIsTyping(true);
    setLeasingInput(term);
    handleLeasingSearch(term);
  };

  useEffect(() => {
    handleMotorcycleSearch(motorcycleInput);
    handleDealerSearch(dealerInput);
    handleLeasingSearch(leasingInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (result.data) {
      setMotorcycleOptions(result.data);
    }
  }, [result.data]);

  useEffect(() => {
    if (resultDealer.data) {
      setDealerOptions(resultDealer.data);
    }
  }, [resultDealer.data]);

  useEffect(() => {
    if (resultLeasing.data) {
      setLeasingOptions(resultLeasing.data);
    }
  }, [resultLeasing.data]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="blue" className="w-full">
          <Plus />
          <span>Deal</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="px-2">
          <DialogTitle>Form Deal</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[556px]">
          <div className="space-y-6">
            <div className="space-y-4 px-2">
              <h2 className="font-semibold">Data Konsumen</h2>
              <Separator />
              <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                <SelectBox
                  options={dealTypeOptions}
                  id="deal-type"
                  label="Tipe Deal Konsumen"
                  placeholder="Tipe Deal Konsumen"
                  value={dealType}
                  setValue={setDealType}
                />
                <SelectBox
                  options={customerRelations}
                  id="customer-relation"
                  label="Hubungan Konsumen"
                  placeholder="Hubungan Konsumen"
                  value={relationValue}
                  setValue={setRelationValue}
                />
                <DatePicker id="call-date" label="Tanggal Call" />
                <TextInput
                  id="customer-name-before"
                  label="Nama Konsumen Sebelumnya"
                  value={customerNameBefore}
                  onChange={() => setCustomerNameBefore(customerNameBefore)}
                  readOnly
                  disabled
                />
                <div className="space-y-3">
                  <TextInput
                    id="customer-deal-name"
                    label="Nama Konsumen Deal"
                    placeholder="Nama Konsumen Deal"
                    value={customerDealName}
                    onChange={(e) => setCustomerDealName(e.target.value)}
                  />
                  <div className="flex items-center gap-x-2">
                    <Checkbox
                      id="check-customer-name"
                      className="border-blue-500 bg-background data-[state=checked]:bg-blue-500"
                      checked={customerDealName === customerNameBefore}
                      onCheckedChange={handleCustomerCheck}
                    />
                    <Label htmlFor="check-customer-name" className="mt-1">
                      Nama Konsumen Sama dengan Sebelumnya
                    </Label>
                  </div>
                </div>
                <TextInput
                  id="nik"
                  label="Nomor Induk Kependudukan (NIK)"
                  placeholder="Nomor Induk Kependudukan"
                  value={customerNik}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                    setCustomerNik(numericValue);
                  }}
                  inputMode="numeric"
                />
                <TextInput
                  id="phone-number"
                  label="Nomor Handphone"
                  placeholder="08123456789"
                  value={customerNik}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                    setCustomerNik(numericValue);
                  }}
                  inputMode="numeric"
                />
                <DatePicker id="birth-date" label="Tanggal Lahir" />
                <ComboBox
                  label="Dealer / Area"
                  id="dealer_area"
                  placeholder="Pilih Dealer/Area"
                  options={dealerOptions}
                  value={dealerInput}
                  onSelect={setDealerInput}
                  inputValue={dealerInput}
                  onValueChange={(search) => onDealerChange(search)}
                  isPendingResult={isTyping || isPendingDealer}
                />
              </div>
            </div>
            {(dealType === 'Unit RO' ||
              dealType === 'Unit Ref' ||
              dealType === 'Unit NC') && (
              <div className="space-y-4 px-2">
                <h2 className="font-semibold">
                  Data Sales Unit{' '}
                  {dealType === 'Unit Ref'
                    ? 'Ref'
                    : dealType === 'Unit NC' && 'NC'}
                </h2>
                <Separator />
                <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                  <DatePicker id="purchase-date" label="Tanggal Pembelian" />
                  {dealType !== 'Unit NC' && (
                    <SelectBox
                      options={dealResults}
                      id="deal-result"
                      label="Hasil Deal"
                      placeholder="Hasil Deal"
                      value={dealResult}
                      setValue={setDealResult}
                    />
                  )}
                  <SelectBox
                    options={purchaseTypes}
                    id="purchase-type"
                    label="Jenis Transaksi"
                    placeholder="Jenis Transaksi"
                    value={purchaseType}
                    setValue={setPurchaseType}
                  />
                  <ComboBox
                    options={motorcycleOptions}
                    label="Tipe Motor"
                    id="motorcycle"
                    placeholder="Pilih Tipe Motor"
                    value={motorcycleInput}
                    onSelect={setMotorcycleInput}
                    inputValue={motorcycleInput}
                    onValueChange={(search) => onMotorcycleChange(search)}
                    isPendingResult={isTyping || isPending}
                  />
                  <TextInput
                    id="frame-number"
                    label="Nomor Rangka"
                    placeholder="Nomor Rangka"
                  />
                  <SelectBox
                    options={motorcycleColors}
                    id="motorcycle-color"
                    label="Warna"
                    placeholder="Pilih Warna"
                    value={motorcycleColor}
                    setValue={setMotorcycleColor}
                  />
                  {(dealType === 'Unit Ref' || dealType === 'Unit NC') && (
                    <ComboBox
                      options={leasingOptions}
                      label="Leasing"
                      id="leasing"
                      placeholder="Pilih Leasing"
                      value={leasingInput}
                      onSelect={setLeasingInput}
                      inputValue={leasingInput}
                      onValueChange={(search) => onLeasingChange(search)}
                      isPendingResult={isTyping || isPendingLeasing}
                    />
                  )}
                  <div className="md:col-span-2">
                    <TextField
                      id="service-description"
                      label="Keterangan"
                      placeholder="Tulis Keterangan Disini"
                      className="resize-none text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
            {dealType === 'Service' && (
              <div className="space-y-4 px-2">
                <h2 className="font-semibold">Data Service</h2>
                <Separator />
                <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                  <DatePicker id="service-date" label="Tanggal Service" />
                  <SelectBox
                    options={serviceTypes}
                    id="service-type"
                    label="Jenis Service"
                    placeholder="Jenis Service"
                    value={serviceType}
                    setValue={setServiceType}
                  />
                  <ComboBox
                    options={motorcycleOptions}
                    label="Tipe Motor"
                    id="motorcycle"
                    placeholder="Pilih Tipe Motor"
                    value={motorcycleInput}
                    onSelect={setMotorcycleInput}
                    inputValue={motorcycleInput}
                    onValueChange={(search) => onMotorcycleChange(search)}
                    isPendingResult={isTyping || isPending}
                  />
                  <TextInput
                    id="frame-number"
                    label="Nomor Rangka"
                    placeholder="Nomor Rangka"
                  />
                  <TextInput
                    id="service-amount"
                    label="Nominal Service"
                    placeholder="Nominal Service"
                  />
                  <div className="md:col-span-2">
                    <TextField
                      id="service-description"
                      label="Keterangan"
                      placeholder="Tulis Keterangan Disini"
                      className="resize-none text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
            {dealType === 'Spare Part' && (
              <div className="space-y-4 px-2">
                <h2 className="font-semibold">Data Spare Part</h2>
                <Separator />
                <div className="grid grid-cols-1 gap-6 p-2 md:grid-cols-2">
                  <DatePicker id="purchase-date" label="Tanggal Pembelian" />
                  <ComboBox
                    options={motorcycleOptions}
                    label="Tipe Motor"
                    id="motorcycle"
                    placeholder="Pilih Tipe Motor"
                    value={motorcycleInput}
                    onSelect={setMotorcycleInput}
                    inputValue={motorcycleInput}
                    onValueChange={(search) => onMotorcycleChange(search)}
                    isPendingResult={isTyping || isPending}
                  />
                  <TextInput
                    id="frame-number"
                    label="Nomor Rangka"
                    placeholder="Nomor Rangka"
                  />
                  <TextInput
                    id="spare-part-amount"
                    label="Nominal Spare Part"
                    placeholder="Nominal Spare Part"
                  />
                  <div className="md:col-span-2">
                    <TextField
                      id="service-description"
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
                    options={dealResults}
                    id="deal-result"
                    label="Hasil Deal"
                    placeholder="Hasil Deal"
                    value={dealResult}
                    setValue={setDealResult}
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
                    options={motorcycleOptions}
                    label="Tipe Motor"
                    id="motorcycle"
                    placeholder="Pilih Tipe Motor"
                    value={motorcycleInput}
                    onSelect={setMotorcycleInput}
                    inputValue={motorcycleInput}
                    onValueChange={(search) => onMotorcycleChange(search)}
                    isPendingResult={isTyping || isPending}
                  />
                  <TextInput
                    id="frame-number"
                    label="Nomor Rangka"
                    placeholder="Nomor Rangka"
                  />
                  <SelectBox
                    options={motorcycleColors}
                    id="motorcycle-color"
                    label="Warna"
                    placeholder="Pilih Warna"
                    value={motorcycleColor}
                    setValue={setMotorcycleColor}
                  />
                  <div className="md:col-span-2">
                    <TextField
                      id="service-description"
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
          <Button variant="blue">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DealDialog;
