import React from 'react';

const AuthCard = ({
  logo,
  children,
}: {
  logo: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex min-h-screen flex-col items-center bg-background pt-6 sm:justify-center sm:pt-0">
    <div>{logo}</div>

    <div className="mt-6 w-full overflow-hidden bg-secondary px-6 py-4 text-white shadow-md sm:max-w-md sm:rounded-lg">
      {children}
    </div>
  </div>
);

export default AuthCard;
