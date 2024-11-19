import axios, { AxiosResponse, AxiosError } from "axios";
import apiClient from "../apiClient";
import { ResolvedApi } from "../interface";

const api = "http://localhost:4000/update-json";

// Function to update the JSON file
export const updateJson = async (): Promise<ResolvedApi<null>> => {
    try {
        const response: AxiosResponse<ResolvedApi<null>> = await apiClient.get(api);
        if (response.status !== 200) {
            throw new Error("Failed to update JSON.");
        }
        console.log("✔️ فایل JSON با موفقیت به‌روزرسانی شد از طریق سرور دولوپ");
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<ResolvedApi<null>>;
            if (axiosError.response) {
                const { message, statusCode } = axiosError.response.data;
                console.error("❌ خطا در به‌روزرسانی فایل JSON:", message);
                return { message, statusCode };
            }
        }
        console.error("❌ خطا در به‌روزرسانی فایل JSON:", error);
        return { message: "مشکلی در به‌روزرسانی فایل JSON رخ داده است", statusCode: 500 };
    }
};