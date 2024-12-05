'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { loginAction } from '@/app/lib/actions/auth';
import { UserAuthForm } from './UserAuthForm';

const LoginPage = () => {
  const { toast } = useToast();
  const { push } = useRouter();

  const { execute, result, isPending } = useAction((formData) => {
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    return loginAction(data);
  });

  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get('redirectUrl') || '/';

  const userLogout = localStorage.getItem('userLogout');

  useEffect(() => {
    if (userLogout === 'true') {
      toast({
        title: 'Logged out',
        description: 'Please login again',
        duration: 3000,
      });
    } else {
      toast({
        title: 'Session Expired',
        description: 'Please login again',
        duration: 3000,
        variant: 'destructive',
      });
    }
    setTimeout(() => {
      localStorage.removeItem('userLogout');
    }, 3000);
  }, [toast, userLogout]);

  useEffect(() => {
    if (result?.data?.status === 'success') {
      toast({
        title: 'Success',
        description: result.data.message,
        duration: 3000,
      });
      push(redirectUrl);
    } else if (result?.data?.status === 'error') {
      toast({
        title: 'Error',
        description: result.data.message,
        variant: 'destructive',
        duration: 3000,
      });
    }
  }, [result, toast, push, redirectUrl]);
  return (
    <UserAuthForm
      action={execute}
      validationErrors={result?.validationErrors}
      isPending={isPending}
    />
  );
};

export default LoginPage;
