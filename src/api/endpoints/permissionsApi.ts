import handleApiRequest from "../handleApiRequest";
import { ResolvedApi, PermissionResolve, IResourceAccess, IModifyUserRoles, IModifyRoleResources, IModifyRoleUsers, IUserAccess } from "../interface";

const api = '/Permission';

export const getPermission = (username: string): Promise<ResolvedApi<PermissionResolve>> => {
    return handleApiRequest<PermissionResolve>({
        url: `${api}/User/${username}`,
        method: 'get',

    });
};

export const getRoleResources = (rolename: string): Promise<ResolvedApi<IResourceAccess[]>> => {
    return handleApiRequest<IResourceAccess[]>({
        url: `${api}/RoleResources/${rolename}`,
        method: 'get',
    });
};

export const postModifyUserRoles = async (data: IModifyUserRoles): Promise<ResolvedApi<null>> => {
    const response = await handleApiRequest<null>({
        url: `${api}/ModifyUserRoles`,
        method: 'post',
        data
    });

    return response;
};

export const postModifyRoleResources = async (data: IModifyRoleResources): Promise<ResolvedApi<null>> => {
    const response = await handleApiRequest<null>({
        url: `${api}/ModifyRoleResources`,
        method: 'post',
        data
    });

    return response;
};

export const postModifyRoleUsers = async (data: IModifyRoleUsers): Promise<ResolvedApi<null>> => {
    const response = await handleApiRequest<null>({
        url: `${api}/ModifyRoleUsers`,
        method: 'post',
        data
    });

    return response;
};

export const getRoleUsers = async (rolename: string): Promise<ResolvedApi<IUserAccess[]>> => {
    const response = await handleApiRequest<IUserAccess[]>({
        url: `${api}/RoleUsers/${rolename}`,
        method: 'get',
    });
    return response;

}