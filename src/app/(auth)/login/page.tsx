'use client';

import React, { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { loginAction } from '@/app/lib/actions/auth';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { execute, result, reset, hasSucceeded } = useAction(loginAction);
  const { toast } = useToast();
  const { status } = useSession();

  useEffect(() => {
    if (result.serverError) {
      toast({
        title: 'Failed',
        description: 'Wrong Username or Password',
        duration: 3000,
        variant: 'destructive',
      });
      reset();
    }
  }, [result]);

  useEffect(() => {
    if (hasSucceeded && status === 'unauthenticated') {
      toast({
        title: 'Success',
        description: 'Login Successful',
        duration: 3000,
      });
    }
  }, [hasSucceeded, status]);

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
