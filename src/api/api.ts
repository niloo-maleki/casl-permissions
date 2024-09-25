import { ResolvedApi, PermissionResolve, AllResourceResolve } from "./interface";

const baseUrl = 'https://localhost:44310/api'

export const getPermission = async (username: string): Promise<ResolvedApi<PermissionResolve>> => {
  try {
    const response = await fetch(`${baseUrl}/Permission/User/${username}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: ResolvedApi<PermissionResolve> = await response.json();
    const { message, statusCode, data } = result

    if (data) {
      return { message, statusCode, data: data };
    } else {
      return { message, statusCode };
    }

  } catch (error) {
    console.error(error);
    return { message: "نام کاربری یا رمز عبور اشتباه است", statusCode: 401 };

  }
};

export const getAllResource = async (): Promise<ResolvedApi<AllResourceResolve[]>> => {
  try {
    const response = await fetch(`${baseUrl}/Resource/All`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result: ResolvedApi<AllResourceResolve[]> = await response.json();
    const { message, statusCode, data } = result

    if (data) {
      return { message, statusCode, data: data };
    } else {
      return { message, statusCode };
    }

  } catch (error) {
    console.error(error);
    return { message: "نام کاربری یا رمز عبور اشتباه است", statusCode: 401 };

  }
};


// export async function getAccessControlByRole(role: string): Promise<Permission[] | null> {
//   try {
//     const response = await fetch("mock/mockData.json");
//     if (!response.ok) {
//       throw new Error("خطا در بارگذاری فایل JSON");
//     }

//     const data: Record<string, RoleAccessControl> = await response.json();

//     if (mockRoles.includes(role)) {
//       const permissions = data[role].permissions

//       return permissions;
//     } else {
//       console.error("نقش وارد شده معتبر نیست");

//       return null;
//     }
//   } catch (error) {
//     console.error("خطا در بارگذاری داده‌های JSON:", error);
//     return null;
//   }
// }
