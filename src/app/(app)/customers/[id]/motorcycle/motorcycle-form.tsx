'use client';

import React from 'react';
import { z } from 'zod';
import TextInput from '@/components/fragments/form/TextInput';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import DatePicker from '@/components/fragments/form/DatePicker';
import { CustomerMotorCycle } from '@/app/lib/data/customers';

const motorcycleFormSchema = z.object({
  type: z.string().min(2, {
    message: 'Type must be at least 2 characters.',
  }),
  chassis_id: z.string().min(2, {
    message: 'Chassis ID must be at least 2 characters.',
  }),
  engine_id: z.string().min(2, {
    message: 'Engine ID must be at least 2 characters.',
  }),
  price: z.string().min(2, {
    message: 'Price must be at least 2 characters.',
  }),
  purchase_type: z.string().min(2, {
    message: 'Purchase Type must be at least 2 characters.',
  }),
  purchase_date: z.date({
    required_error: 'Purchase date is required.',
  }),
});

const MotorcycleForm = ({ data }: { data: CustomerMotorCycle }) => {
  return (
    <form className="space-y-8">
      <TextInput
        label="Type"
        id="type"
        placeholder="Motorcycle Type"
        defaultValue={
          data.purchases[0].purchase.purchaseMotorcycles[0].motorcycle.type
            .motorcycleName
        }
      />
      <TextInput
        label="Chassis ID"
        id="chassis-id"
        placeholder="Chassis ID"
        defaultValue={
          data.purchases[0].purchase.purchaseMotorcycles[0].motorcycle.chassisId
        }
      />
      <TextInput
        label="Engine ID"
        id="engine-id"
        placeholder="Engine ID"
        defaultValue={
          data.purchases[0].purchase.purchaseMotorcycles[0].motorcycle.engineId
        }
      />
      <TextInput
        label="Purchase Type"
        id="purchase-type"
        placeholder="Purchase Type"
        defaultValue={data.purchases[0].purchase.purchaseType}
      />
      <TextInput
        label="Price"
        id="price"
        placeholder="Price"
        defaultValue={
          data.purchases[0].purchase.purchaseMotorcycles[0].motorcycle.price
        }
      />
      <DatePicker
        id="purchase-date"
        label="Purchase Date"
        initialDate={data.purchases[0].purchase.purchaseDate}
      />
      <SubmitButton>Update Data</SubmitButton>
    </form>
  );
};

export default MotorcycleForm;
