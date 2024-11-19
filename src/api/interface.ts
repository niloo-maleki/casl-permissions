import { Actions } from "@src/context/interface";
import permissionsData from "@src/json/allResourceData.json";


export interface ResolvedApi<T> {
    message: string;
    statusCode: number;
    data?: T | null
}
export interface Permission {
    action: Actions[];
    resourceId: number;
}

export interface IUser {
    id?: number,
    userName: string,
    password?: string
}
export interface PermissionResolve {
    token: string;
    permissions: Permission[]
}

export interface IPage {
    id?: number;
    name: string;
}

export interface PermissionResource {
    id?: number;
    name: string;
    description: string | null;
    page: IPage
}

export interface IGetRole {
    id?: number,
    roleName: string
}
export interface IResourceAccess {
    resourceName: string,
    hasAccess: boolean,
}

export interface IRoleAccess {
    roleName: string,
    hasAccess: boolean,
}
export interface IUserAccess {
    userName: string,
    hasAccess: boolean
}

export interface IModifyRoleResources {
    roleName: string,
    resourceAccess: IResourceAccess[],
}

export interface IModifyRoleUsers {
    roleName: string,
    userAccess: IUserAccess[],
}
export interface IModifyUserRoles {
    userName: string,
    roleAccess: IRoleAccess[],
}

export type PagePermissionKey = keyof typeof permissionsData;

export type PermissionGroups = Record<PagePermissionKey, PermissionResource[]>

export type ApiData = Record<string, ReadonlyArray<PermissionResource>>;
export type CamelCase<S extends string> = S extends `${infer P}-${infer R}`
    ? `${Lowercase<P>}${Capitalize<CamelCase<R>>}`
    : S extends `${infer P}_${infer R}`
    ? `${Lowercase<P>}${Capitalize<CamelCase<R>>}`
    : S;

export type PermissionsFromApi<T extends ApiData> = {
    [K in keyof T]: {
        [R in CamelCase<T[K][number]["name"]>]: {
            id: number;
            name: string;
            description: string;
        };
    };
};

export interface ApiResponse {
    [key: string]: PermissionResource[];
}

type InternalKeys<T> = {
    [K in keyof T]: keyof T[K];
}[keyof T];

export type PermissionKey = InternalKeys<typeof permissionsData>;

