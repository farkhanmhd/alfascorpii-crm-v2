'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { loginAction } from '@/app/lib/actions/auth';
import { UserAuthForm } from './UserAuthForm';

const LoginPage = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { push } = useRouter();
  const callbackUrl =
    new URLSearchParams(window.location.search).get('redirectUrl') || '/';

  const { execute, result, isPending } = useAction((formData) => {
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    localStorage.removeItem('loggedOut');
    return loginAction(data);
  });

  const manualLogOut = localStorage.getItem('userLogout') === 'true';

  useEffect(() => {
    if (manualLogOut) {
      toast({
        title: 'Logged out',
        description: 'Please login again',
        duration: 3000,
      });

      setTimeout(() => {
        localStorage.removeItem('userLogout');
      }, 3000);
    }
  }, [session, toast, manualLogOut]);

  useEffect(() => {
    if (result.serverError) {
      toast({
        title: 'Login Failed',
        description: 'Wrong Username or Password',
        variant: 'destructive',
        duration: 3000,
      });
    }
  }, [result.serverError, toast]);

  useEffect(() => {
    if (result?.data?.user) {
      toast({
        title: 'Success',
        description: 'Logged in successfully',
        duration: 3000,
      });

      push(callbackUrl);
    }
  }, [result?.data?.user, toast, push, callbackUrl]);
  return (
    <UserAuthForm
      action={execute}
      validationErrors={result?.validationErrors}
      isPending={isPending}
    />
  );
};

export default LoginPage;
