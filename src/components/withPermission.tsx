import React from 'react';
import { usePermissions } from '@/hooks';

const withPermission = (
  WrappedComponent: React.ComponentType,
  requiredPermission: string
) => {
  return (props: any) => {
    const { permissions } = usePermissions();

    if (
      !permissions.some(
        (permission) => permission.permission_name === requiredPermission
      )
    ) {
      return <div>Access Denied</div>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withPermission;
