'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
// import { ChevronDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
// import { Button, buttonVariants } from '@/components/ui/button';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  // FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DatePicker from '@/components/fragments/form/DatePicker';

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

type MotorcycleFormValues = z.infer<typeof motorcycleFormSchema>;

const MotorcycleForm = () => {
  const form = useForm<MotorcycleFormValues>({
    resolver: zodResolver(motorcycleFormSchema),
  });

  function onSubmit(data: MotorcycleFormValues) {
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
          name="chassis_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chassis ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Chassis ID"
                  defaultValue="MH3SG9320RJ036139"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="engine_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engine ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Engine ID"
                  defaultValue="G3V5E-0053220"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purchase_type"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Purchase Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue="Cash">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit">Credit</SelectItem>
                </SelectContent>
              </Select>
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
                  defaultValue="IDR 800.000.000"
                  {...field}
                />
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
        <Button type="submit">Update Data</Button>
      </form>
    </Form>
  );
};

export default MotorcycleForm;
