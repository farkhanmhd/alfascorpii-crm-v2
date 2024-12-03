'use client';

import React, { useState } from 'react';

import { cn , getErrorMessages } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fragments/form/TextInput';
import { Eye, EyeClosed } from 'lucide-react';
import SubmitButton from '@/components/fragments/buttons/SubmitButton';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  action: (formData: FormData) => void | string | undefined;
  validationErrors?: {
    username?: {
      _errors?: string[];
    };
    password?: {
      _errors?: string[];
    };
  };
  isPending: boolean;
}

export const UserAuthForm = ({
  action,
  validationErrors,
  className,
  isPending,
  ...props
}: UserAuthFormProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordHide, setPasswordHide] = useState<boolean>(true);

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form action={action}>
        <div className="grid gap-5">
          <div className="grid gap-4">
            <TextInput
              label="Username"
              id="username"
              name="username"
              placeholder="Username"
              type="username"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isPending}
              autoFocus
              hideLabel
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={getErrorMessages(validationErrors?.username)}
            />
            <div className="relative">
              <TextInput
                label="Password"
                id="password"
                name="password"
                type={passwordHide ? 'password' : 'text'}
                placeholder="Password"
                disabled={isPending}
                hideLabel
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={getErrorMessages(validationErrors?.password)}
              />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                className="absolute right-0 top-0"
                onClick={() => setPasswordHide(!passwordHide)}
              >
                {passwordHide ? <EyeClosed /> : <Eye />}
              </Button>
            </div>
          </div>
          <SubmitButton disabled={isPending}>Login</SubmitButton>
        </div>
      </form>
    </div>
  );
}
