import { AuthContext } from "@src/context/AuthContext";
import { useContext } from "react";

export const useAccessPage = (( pagePermission: string) => {
    const { permissions } = useContext(AuthContext);

    const hasAccess = permissions.some(permission => permission.resourceId.toString() === pagePermission || permission.resourceId.toString() === '1' );


    return hasAccess
})