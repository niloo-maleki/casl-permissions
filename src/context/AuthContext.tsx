/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import { useAction } from "@src/hooks/useAction";
import { Permission } from "@src/api/interface";
import { AuthContextProps, AuthProviderProps } from "./interface";



export const AuthContext = createContext<AuthContextProps>({
  setPermissions: () => { },
  setRole: () => { },
  role: null,
  permissions: [],
  actionsByItem: {},
});

export const AuthProvider = (props: AuthProviderProps) => {
  const { children, initialRole } = props;

  const [role, setRole] = useState<string | null>(initialRole);

  const [permissions, setPermissions] = useState<Permission[]>(() => {
    const storedPermissions = localStorage.getItem('permissions');
    return storedPermissions ? JSON.parse(storedPermissions) : [];
  });

  const { actionsByItem } = useAction(permissions);

  useEffect(() => {
    localStorage.setItem('useName', role || '');
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }, [role, permissions]);

  useEffect(() => {
    setRole(role)
  }, [role])

  const value = {
    role,
    setRole,
    permissions,
    setPermissions,
    actionsByItem
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
