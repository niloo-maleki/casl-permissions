import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { IGetRole, IModifyRoleResources, IModifyRoleUsers, IModifyUserRoles, IResourceAccess, IUser, IUserAccess, PermissionGroups, PermissionResolve, PermissionResource, ResolvedApi } from "./interface";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiRequest = async <T>(config: AxiosRequestConfig): Promise<ResolvedApi<T>> => {
  try {
    const response: AxiosResponse<ResolvedApi<T>> = await apiClient(config);
    const { message, statusCode, data } = response.data;

    return { message, statusCode, ...(data && { data }) };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ResolvedApi<T>>;
      if (axiosError.response) {
        const { message, statusCode } = axiosError.response.data;
        return { message, statusCode };
      }
    }
    console.error("مشکلی در درخواست رخ داده است", error);
    return { message: "مشکلی در درخواست رخ داده است", statusCode: 500 };
  }
};

export const getPermission = (username: string): Promise<ResolvedApi<PermissionResolve>> => {
  return handleApiRequest<PermissionResolve>({
    url: `/Permission/User/${username}`,
    method: 'get',

  });
};

export const getRoleResources = (rolename: string): Promise<ResolvedApi<IResourceAccess[]>> => {
  return handleApiRequest<IResourceAccess[]>({
    url: `/Permission/RoleResources/${rolename }`,
    method: 'get',
  });
};

export const postResource = async (data: PermissionResource): Promise<ResolvedApi<null>> => {
  const response = await handleApiRequest<null>({
    url: `/Resource`,
    method: 'post',
    data
  });

  return response;
};

export const postRole = async (data: IGetRole): Promise<ResolvedApi<null>> => {
  const response = await handleApiRequest<null>({
    url: `/Role`,
    method: 'post',
    data
  });

  return response;
};

export const postModifyUserRoles = async (data: IModifyUserRoles): Promise<ResolvedApi<null>> => {
  const response = await handleApiRequest<null>({
    url: `/Permission/ModifyUserRoles`,
    method: 'post',
    data
  });

  return response;
};

export const postModifyRoleResources = async (data: IModifyRoleResources): Promise<ResolvedApi<null>> => {
  const response = await handleApiRequest<null>({
    url: `/Permission/ModifyRoleResources`,
    method: 'post',
    data
  });

  return response;
};

export const postModifyRoleUsers = async (data: IModifyRoleUsers): Promise<ResolvedApi<null>> => {
  const response = await handleApiRequest<null>({
    url: `/Permission/ModifyRoleUsers`,
    method: 'post',
    data
  });

  return response;
};

export const getRoleUsers = async (rolename: string): Promise<ResolvedApi<IUserAccess[]>> => {
  const response = await handleApiRequest<IUserAccess[]>({
    url: `/Permission/RoleUsers/${rolename}`,
    method: 'get',
  });
  return response;

}
export const getAllResource = async (): Promise<ResolvedApi<PermissionGroups>> => {
  const response = await handleApiRequest<PermissionGroups>({
    url: `/Resource/All`,
    method: 'get',
  });


  if (!response || !response.data) {
    throw new Error('Data not found in the response');
  }

  return response;
};


export const getAllRoles = async (): Promise<ResolvedApi<IGetRole[]>> => {
  const response = await handleApiRequest<IGetRole[]>({
    url: `/Role/All`,
    method: 'get',
  });


  if (!response || !response.data) {
    throw new Error('Data not found in the response');
  }

  return response;
};


  export const getAllUsers = async (): Promise<ResolvedApi<IUser[]>> => {
  const response = await handleApiRequest<IUser[]>({
    url: `/User/All`,
    method: 'get',
  });


  if (!response || !response.data) {
    throw new Error('Data not found in the response');
  }

  return response;
};

// Function to update the JSON file
export const updateJson = async (): Promise<ResolvedApi<null>> => {
  try {
    const response: AxiosResponse<ResolvedApi<null>> = await apiClient.get("http://localhost:4000/update-json");
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