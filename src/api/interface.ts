import { Actions } from "@src/context/interface";


export interface Permission {
    action: Actions[];
    resourceId: number;
}

export interface PermissionResolve {
    token: string;
    permissions: Permission[]
}

export interface AllResourceResolve {
    id: number;
    name: string
}


export interface ResolvedApi<T> {
    message: string;
    statusCode: number;
    data?: T
}
