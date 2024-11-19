import { defineAbility } from '@casl/ability';
import { PermissionResource } from '@src/api/interface';
import { AuthContext } from '@src/context/AuthContext';
import React, { useContext } from 'react';


interface PermissionWrapperProps {
  noAccessMessage?: string;
  children: React.ReactNode;
  permissionKey: PermissionResource;
}

const PermissionWrapper = (props: PermissionWrapperProps) => {
  const { noAccessMessage, children, permissionKey } = props;
  const { permissions, actionsByItem } = useContext(AuthContext);
  const {id} = permissionKey;

  const ability = defineAbility((can) => {
    if (!permissions) return;

    permissions.map((permission) => {
      const { action, resourceId } = permission;

      can(action, resourceId.toString());
    });
  });

  /* I should have sent the View, but it is correct to send the manage */
  const isAdmin = ability.can('View', '1');
  if (isAdmin) {
    return <>{children}</>;
  }

  if (!ability || !id || !actionsByItem[id]) {
    if (noAccessMessage) {
      return <div>{noAccessMessage}</div>;
    }
    return
  }

  const hasPermission = actionsByItem[id].some(act => ability.can(act, id.toString()));

  return (
    <>
      {
        hasPermission && <> {children}</>
      }
    </>
  );
};

export default PermissionWrapper;
