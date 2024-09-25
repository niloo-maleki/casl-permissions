import {  defineAbility } from '@casl/ability';

import { AuthContext } from '@src/context/AuthContext';
import React, { useContext } from 'react';

interface PermissionWrapperProps {
  permissionId:number;
  noAccessMessage?: string;
  children: React.ReactNode;
}

const PermissionWrapper = (props: PermissionWrapperProps) => {
  const { permissionId, noAccessMessage, children } = props;
  const { permissions, actionsByItem } = useContext(AuthContext);


  const ability = defineAbility((can) => {
    if (!permissions) return;

    permissions.map((permission) => {
      const { action, resourceId } = permission;

      can(action, resourceId.toString());
    });
  });

  /* I should have sent the View, but it is correct to send the manage */
  const isAdmin = ability.can('View', '1');
  if (isAdmin ) {
    return <>{children}</>;
  }

  if (!ability || !actionsByItem[permissionId]) {
    if (noAccessMessage) {
      return <div>{noAccessMessage}</div>;
    }
    return
  }

  const hasPermission = actionsByItem[permissionId].some(act => ability.can(act, permissionId.toString()));

  return (
    <>
      {
        hasPermission && <> {children}</>
      }
    </>
  );
};

export default PermissionWrapper;
