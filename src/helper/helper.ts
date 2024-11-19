// Object.freeze() works at runtime. It ensures that the object cannot be modified once the code is executed,
// preventing any changes to the object in JavaScript, even if attempted during execution.

import { PagePermissionKey, PermissionKey } from "@src/api/interface";
import { PermissionsDataType } from "@src/hooks/usePermissions";

export const deepFreeze = <T extends object>(obj: T): Readonly<T> => {
    Object.keys(obj).forEach((key) => {
        const prop = obj[key as keyof T];
        if (typeof prop === 'object' && prop !== null) {
            deepFreeze(prop);
        }
    });
    return Object.freeze(obj);
};
export const getPermissionKey = (resources: PermissionsDataType ,permission: { page: PagePermissionKey; key: PermissionKey }) => {
    const pagePermissions = resources[permission.page];
    return pagePermissions[permission.key as keyof typeof pagePermissions];
};


export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

