import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import apiClient from "./apiClient";

export interface ResolvedApi<T> {
    message: string;
    statusCode: number;
    data?: T;
}

const handleApiRequest = async <T>(config: AxiosRequestConfig): Promise<ResolvedApi<T>> => {
    try {
        const response: AxiosResponse<ResolvedApi<T>> = await apiClient(config);
        const { message, statusCode, data } = response.data;

        return { message, statusCode, ...(data && { data }) };

    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const { message, statusCode } = error.response.data;
            return { message, statusCode };
        }
        console.error("API Request Error:", error);
        return { message: "An error occurred during the API request", statusCode: 500 };
    }
};

export default handleApiRequest;
