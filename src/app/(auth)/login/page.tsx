'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { loginAction } from '@/app/lib/actions/auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';

const LoginPage = () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();
  const { push } = useRouter();
  const callbackUrl =
    new URLSearchParams(window.location.search).get('callbackUrl') || '/';

  const { execute, result } = useAction(loginAction);

  useEffect(() => {
    if (!session) {
      toast({
        title: 'Session Expired',
        description: 'Please login again',
        variant: 'destructive',
        duration: 3000,
      });
    }
  }, [session, toast]);

  useEffect(() => {
    if (result.serverError) {
      toast({
        title: 'Error',
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
    <form className="flex flex-col gap-4" action={execute}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">Username:</Label>
        <Input
          id="username"
          autoComplete="off"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        {result?.validationErrors?.username &&
          result.validationErrors.username._errors?.map((error) => (
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {result?.validationErrors?.password &&
          result.validationErrors.password._errors?.map((error) => (
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
