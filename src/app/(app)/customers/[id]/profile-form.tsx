'use client';

import React from 'react';
// import { Link } from 'next-view-transitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// import { cn } from '@/lib/utils';
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

const profileFormSchema = z.object({
  dealer: z.string(),
  location: z.string(),
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
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//   bio: 'I own a computer.',
//   urls: [
//     { value: 'https://shadcn.com' },
//     { value: 'http://twitter.com/shadcn' },
//   ],
// };

export const ProfileForm = () => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    // defaultValues,
    mode: 'onChange',
  });

  //   const { fields, append } = useFieldArray({
  //     name: 'urls',
  //     control: form.control,
  //   });

  function onSubmit(data: ProfileFormValues) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                <Input placeholder="Name" defaultValue="Jhon Doe" {...field} />
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

        <Button type="submit">Update Customer</Button>
      </form>
    </Form>
  );
};
