import { IconArrowAltLeftAlt, IconHomeDuotoneLine, IconOrderLight, IconSettingLineLight, IconTranslate } from "@shatel/ui-kit";
import { PagePermissionKey, PermissionKey } from "@src/api/interface";

export type MenuItem = {
    title: string;
    path: string;
    icon: JSX.ElementType;
    permission?: {
        page: PagePermissionKey;
        key: PermissionKey
    }
};

export const navigationItems: MenuItem[] = [
    {
        title: 'داشبورد',
        path: '/dashboard',
        icon: IconHomeDuotoneLine,
    },
    {
        title: 'فهرست مشترکین',
        path: '/customer',
        icon: IconOrderLight,
    },
    {
        title: 'مدیریت',
        path: '/manage',
        icon: IconSettingLineLight,
        permission: {
            page:'Manager',
            key: 'pageManager'
        }
    },
    {
        title: 'ترجمه ها',
        path: '/translate',
        icon: IconTranslate,
    },
    {

        title: 'خروج',
        path: '/',
        icon: IconArrowAltLeftAlt,
    },
]