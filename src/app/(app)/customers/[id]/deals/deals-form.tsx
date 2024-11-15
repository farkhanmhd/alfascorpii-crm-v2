'use client';

import React from 'react';
// import { Link } from 'next-view-transitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  // FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { Switch } from '@/components/ui/switch';
import DatePicker from '@/components/fragments/form/DatePicker';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const dealsFormSchema = z.object({
  status: z.string().min(1, { message: 'Status is required' }),
  purchase_date: z.date({
    required_error: 'Purchase date is required.',
  }),
  type: z.string().min(2, {
    message: 'Type must be at least 2 characters.',
  }),
  via: z.string().min(2, {
    message: 'Via must be at least 2 characters.',
  }),
  promo_code: z.string().min(2, {
    message: 'Promo Code must be at least 2 characters.',
  }),
  price: z.string().min(2, {
    message: 'Price must be at least 2 characters.',
  }),
  discount: z.string().min(2, {
    message: 'Terms must be at least 2 characters.',
  }),
  total: z.string().min(2, {
    message: 'Total must be at least 2 characters.',
  }),
});

type DealsFormValues = z.infer<typeof dealsFormSchema>;

// This can come from your database or API.
// const defaultValues: Partial<DealsFormValues> = {
//   communication_emails: false,
//   marketing_emails: false,
//   social_emails: true,
//   security_emails: true,
// };

const DealsForm = () => {
  const form = useForm<DealsFormValues>({
    resolver: zodResolver(dealsFormSchema),
    // defaultValues,
  });

  function onSubmit(data: DealsFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="Status" defaultValue="Active" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchase_date"
          render={() => (
            <FormItem>
              <FormLabel className="mb-2 block">Purchase Date</FormLabel>
              <FormControl>
                <DatePicker />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input
                  placeholder="Motorcycle Type"
                  defaultValue="YZF R1"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="via"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Purchase Via</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="Ecommerce">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select via" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Employee">Employee</SelectItem>
                  <SelectItem value="Social Media">Social Media</SelectItem>
                  <SelectItem value="Ecommerce">Ecommerce</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="promo_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promo Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Promo Code"
                  defaultValue="PROMO123"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Price"
                  defaultValue="IDR 31.000.000"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input
                  placeholder="Discount"
                  defaultValue="IDR 1.000.000"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="total"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total</FormLabel>
              <FormControl>
                <Input
                  placeholder="Total"
                  defaultValue="IDR 30.000.000"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Update Data</Button>
      </form>
    </Form>
  );
};

export default DealsForm;
