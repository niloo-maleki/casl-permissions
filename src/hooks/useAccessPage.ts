import { PermissionResource } from "@src/api/interface";
import { AuthContext } from "@src/context/AuthContext";
import { useContext, useState } from "react";

export const useAccessPage = ((pagePermission: PermissionResource) => {
    const { permissions } = useContext(AuthContext);
    const [error, setError] = useState('')

    const { id } = pagePermission;

    if (!id){
        setError('❌id not exist!')
        return
    } 

    const hasAccess = permissions.some(permission => permission.resourceId.toString() === id.toString() || permission.resourceId.toString() === '1');

    return { hasAccess, error }
})