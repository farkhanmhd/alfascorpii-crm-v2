// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import { useAction } from 'next-safe-action/hooks';
// import { useRouter } from 'next/navigation';
// import { useToast } from '@/hooks/use-toast';
// import { loginAction } from '@/app/lib/actions/auth';
// import { Label } from '@/components/ui/label';
// import { Input } from '@/components/ui/input';
// import SubmitButton from '@/components/fragments/buttons/SubmitButton';

// const LoginPage = () => {
//   const { data: session } = useSession();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const { toast } = useToast();
//   const { push } = useRouter();
//   const callbackUrl =
//     new URLSearchParams(window.location.search).get('callbackUrl') || '/';

//   const { execute, result } = useAction((formData) => {
//     const data = {
//       username: formData.get('username'),
//       password: formData.get('password'),
//     };

//     localStorage.removeItem('loggedOut');
//     return loginAction(data);
//   });

//   const manualLogOut = localStorage.getItem('loggedOutManual') === 'true';

//   useEffect(() => {
//     const wasLoggedOut = localStorage.getItem('loggedOut') === 'true';

//     if (manualLogOut) {
//       toast({
//         title: 'Logged out',
//         description: 'Please login again',
//         duration: 3000,
//       });

//       setTimeout(() => {
//         localStorage.removeItem('loggedOutManual');
//       }, 3000);
//     }

//     if (!session && !wasLoggedOut) {
//       toast({
//         title: 'Session Expired',
//         description: 'Please login again',
//         variant: 'destructive',
//         duration: 3000,
//       });

//       localStorage.setItem('loggedOut', 'true');
//     }
//   }, [session, toast, manualLogOut]);

//   useEffect(() => {
//     if (result.serverError) {
//       toast({
//         title: 'Error',
//         description: 'Wrong Username or Password',
//         variant: 'destructive',
//         duration: 3000,
//       });
//     }
//   }, [result.serverError, toast]);

//   useEffect(() => {
//     if (result?.data?.user) {
//       toast({
//         title: 'Success',
//         description: 'Logged in successfully',
//         duration: 3000,
//       });

//       push(callbackUrl);
//     }
//   }, [result?.data?.user, toast, push, callbackUrl]);

//   return (
//     <form className="flex flex-col gap-4" action={execute}>
//       <div className="flex flex-col gap-2">
//         <Label htmlFor="username">Username:</Label>
//         <Input
//           id="username"
//           autoComplete="off"
//           name="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           autoFocus
//         />
//         {result?.validationErrors?.username &&
//           result.validationErrors.username._errors?.map((error) => (
//             <span key={error} className="text-sm text-red-500">
//               {error}
//             </span>
//           ))}
//       </div>
//       <div className="flex flex-col gap-2">
//         <Label htmlFor="password">Password:</Label>
//         <Input
//           type="password"
//           id="password"
//           autoComplete="off"
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         {result?.validationErrors?.password &&
//           result.validationErrors.password._errors?.map((error) => (
//             <span key={error} className="text-sm text-red-500">
//               {error}
//             </span>
//           ))}
//       </div>

//       <SubmitButton>Login</SubmitButton>
//     </form>
//   );
// };

// export default LoginPage;

'use client';

import React, { useEffect } from 'react';
import { UserAuthForm } from './UserAuthForm';
import { useSession } from 'next-auth/react';
import { useAction } from 'next-safe-action/hooks';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { loginAction } from '@/app/lib/actions/auth';

const LoginPage = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { push } = useRouter();
  const callbackUrl =
    new URLSearchParams(window.location.search).get('callbackUrl') || '/';

  const { execute, result, isPending } = useAction((formData) => {
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    localStorage.removeItem('loggedOut');
    return loginAction(data);
  });

  const manualLogOut = localStorage.getItem('loggedOutManual') === 'true';

  useEffect(() => {
    const wasLoggedOut = localStorage.getItem('loggedOut') === 'true';

    if (manualLogOut) {
      toast({
        title: 'Logged out',
        description: 'Please login again',
        duration: 3000,
      });

      setTimeout(() => {
        localStorage.removeItem('loggedOutManual');
      }, 3000);
    }

    if (!session && !wasLoggedOut) {
      toast({
        title: 'Session Expired',
        description: 'Please login again',
        variant: 'destructive',
        duration: 3000,
      });

      localStorage.setItem('loggedOut', 'true');
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
