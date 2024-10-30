import React from 'react';

const AuthSessionStatus = ({
  status,
  className,
  ...props
}: {
  status: string | null;
  className: string;
}) => (
  <div>
    {status && (
      <div
        className={`${className} text-sm font-medium text-green-600`}
        {...props}
      >
        {status}
      </div>
    )}
  </div>
);

export default AuthSessionStatus;
