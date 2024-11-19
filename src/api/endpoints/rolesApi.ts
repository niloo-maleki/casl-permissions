import handleApiRequest from "../handleApiRequest";
import { IGetRole, ResolvedApi } from "../interface";

const api = '/Role';

export const postRole = async (data: IGetRole): Promise<ResolvedApi<null>> => {
    const response = await handleApiRequest<null>({
        url: `${api}`,
        method: 'post',
        data
    });

    return response;
};

export const getAllRoles = async (): Promise<ResolvedApi<IGetRole[]>> => {
    const response = await handleApiRequest<IGetRole[]>({
        url: `${api}/All`,
        method: 'get',
    });


    if (!response || !response.data) {
        throw new Error('Data not found in the response');
    }

    return response;
};
