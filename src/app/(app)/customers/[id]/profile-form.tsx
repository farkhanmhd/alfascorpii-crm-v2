'use client';

import React from 'react';
// import { Link } from 'next-view-transitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from '@/components/fragments/form/DatePicker';

const profileFormSchema = z.object({
  dealer: z
    .string()
    .min(2, { message: 'Dealer must be at least 2 characters.' }),
  location: z
    .string()
    .min(2, { message: 'Location must be at least 2 characters.' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  address: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters.' }),
  phone: z
    .string()
    .min(2, { message: 'Phone must be at least 2 characters.' })
    .regex(/^\+?\d+$/, { message: 'Phone must only contain numbers.' }),
  sub_district: z
    .string()
    .min(2, { message: 'Sub-District must be at least 2 characters.' }),
  district: z
    .string()
    .min(2, { message: 'Sub-District must be at least 2 characters.' }),
  city: z
    .string()
    .min(2, { message: 'Sub-District must be at least 2 characters.' }),
  house_ownership_status: z.string().min(2, {
    message: 'House Ownership must be at least 2 characters.',
  }),
  job_name: z.string().min(2, {
    message: 'Job must be at least 2 characters.',
  }),
  date_of_birth: z.date({
    required_error: 'Date of Birth is required.',
  }),
  hobby_name: z.string().min(2, {
    message: 'Hobby must be at least 2 characters.',
  }),
  income_upper_limit: z.string().min(2, {
    message: 'Income Code must be at least 2 characters.',
  }),
  expense_upper_limit: z.string().min(2, {
    message: 'Expense Code must be at least 2 characters.',
  }),
});

type OverviewFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
// const defaultValues: Partial<OverviewFormValues> = {
//   bio: 'I own a computer.',
//   urls: [
//     { value: 'https://shadcn.com' },
//     { value: 'http://twitter.com/shadcn' },
//   ],
// };

const ProfileForm = ({ value }: { value: 'overview' | 'extended' }) => {
  const form = useForm<OverviewFormValues>({
    resolver: zodResolver(profileFormSchema),
    // defaultValues,
    mode: 'onChange',
  });

  //   const { fields, append } = useFieldArray({
  //     name: 'urls',
  //     control: form.control,
  //   });

  function onSubmit(data: OverviewFormValues) {
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          className={cn('mb-8 flex-col gap-y-6', {
            hidden: value !== 'overview',
            flex: value === 'overview',
          })}
        >
          <div className="flex flex-col gap-6 md:flex-row">
            <FormField
              control={form.control}
              name="dealer"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Dealer / Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Main Dealer"
                      defaultValue="PT Alfa Scorpii / MD01"
                      disabled
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue="Sumatera Utara"
                  >
                    <FormControl>
                      <SelectTrigger disabled>
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Medan">Medan</SelectItem>
                      <SelectItem value="Sumatera Utara">
                        Sumatera Utara
                      </SelectItem>
                      <SelectItem value="Aceh">Aceh</SelectItem>
                      <SelectItem value="Riau">Riau</SelectItem>
                      <SelectItem value="Kepulauan Riau">
                        Kepulauan Riau
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Name"
                    defaultValue="Jhon Doe"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+6281234567890"
                    defaultValue="+6281234567890"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Address"
                    defaultValue="Jl. Raya No. 1"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sub_district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub-District</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sub-District"
                    defaultValue="Kesawan"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input
                    placeholder="District"
                    defaultValue="Medan Barat"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" defaultValue="Medan" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div
          className={cn('mb-8 flex-col gap-y-6', {
            hidden: value !== 'extended',
            flex: value === 'extended',
          })}
        >
          <FormField
            control={form.control}
            name="house_ownership_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House Ownership Status</FormLabel>
                <FormControl>
                  <Input
                    placeholder="House Ownership"
                    defaultValue="Rumah Sendiri"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Job"
                    defaultValue="Wiraswasta"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_of_birth"
            render={() => (
              <FormItem>
                <FormLabel className="mb-2 block">Date of Birth</FormLabel>
                <FormControl>
                  <DatePicker />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hobby_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hobby</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Hobby"
                    defaultValue="Membaca"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="income_upper_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Income</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Income"
                    defaultValue="IDR 7.000.000"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expense_upper_limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expense</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Expense"
                    defaultValue="IDR 3.000.000"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Update Customer Data</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
