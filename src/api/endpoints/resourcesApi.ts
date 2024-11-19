import handleApiRequest from "../handleApiRequest";
import { PermissionResource, ResolvedApi, PermissionGroups } from "../interface";

const api = '/Resource';

export const postResource = async (data: PermissionResource): Promise<ResolvedApi<null>> => {
    const response = await handleApiRequest<null>({
        url: `${api}`,
        method: 'post',
        data
    });

    return response;
};

export const getAllResource = async (): Promise<ResolvedApi<PermissionGroups>> => {
    const response = await handleApiRequest<PermissionGroups>({
        url: `${api}/All`,
        method: 'get',
    });
    if (!response || !response.data) {
        throw new Error('Data not found in the response');
    }

    return response;
};
