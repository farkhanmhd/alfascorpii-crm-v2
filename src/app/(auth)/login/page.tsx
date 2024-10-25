'use client';

import React, { useEffect } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useToast } from '@/hooks/use-toast';
import { loginAction } from '@/app/lib/actions/auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { toast } = useToast();
  const { execute, result, hasSucceeded } = useAction(loginAction);
  const router = useRouter();

  useEffect(() => {
    if (hasSucceeded) {
      toast({
        title: 'Success',
        description: 'Login successful',
        duration: 3000,
      });
      router.push('/');
    }
  }, [hasSucceeded, toast]);

  return (
    <form className="flex flex-col gap-4" action={execute}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username:</Label>
        <Input id="username" autoComplete="off" name="username" />
        {result?.validationErrors?.username &&
          result?.validationErrors?.username?._errors?.map((error) => (
            <span key={error} className="text-sm text-red-500">
              {error}
            </span>
          ))}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          autoComplete="off"
          name="password"
        />
        {result?.validationErrors?.password &&
          result?.validationErrors?.password?._errors?.map((error) => (
            <span key={error} className="text-sm text-red-500">
              {error}
            </span>
          ))}
      </div>
      <SubmitButton>Login</SubmitButton>
    </form>
  );
};

export default LoginPage;
