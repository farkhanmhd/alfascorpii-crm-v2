'use client';

import React, { FormEvent, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const Page = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState([]);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    });
  };

  return (
    <form onSubmit={submitForm}>
      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          type="text"
          value={name}
          className="mt-1 block w-full"
          onChange={(event) => setName(event.target.value)}
          autoComplete="off"
          required
          autoFocus
        />
      </div>

      {/* Email Address */}
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>

        <Input
          id="email"
          type="email"
          value={email}
          className="mt-1 block w-full"
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="off"
          required
        />
      </div>

      {/* Password */}
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>

        <Input
          id="password"
          type="password"
          value={password}
          className="mt-1 block w-full"
          onChange={(event) => setPassword(event.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      {/* Confirm Password */}
      <div className="mt-4">
        <Label htmlFor="passwordConfirmation">Confirm Password</Label>

        <Input
          id="passwordConfirmation"
          type="password"
          value={passwordConfirmation}
          className="mt-1 block w-full"
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
        />
      </div>

      <div className="mt-4 flex items-center justify-end">
        <Link
          href="/login"
          className="text-sm text-gray-600 underline hover:text-gray-900"
        >
          Already registered?
        </Link>

        <Button className="ml-4">Register</Button>
      </div>
    </form>
  );
};

export default Page;
