import handleApiRequest from "../handleApiRequest";
import { ResolvedApi, IUser } from "../interface";

const api = '/User';

export const getAllUsers = async (): Promise<ResolvedApi<IUser[]>> => {
    const response = await handleApiRequest<IUser[]>({
        url: `${api}/All`,
        method: 'get',
    });


    if (!response || !response.data) {
        throw new Error('Data not found in the response');
    }

    return response;
};