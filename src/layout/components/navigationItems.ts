import { IconArrowAltLeftAlt, IconHomeDuotoneLine, IconOrderLight, IconSettingLineLight } from "@shatel/ui-kit";

export type MenuItem = {
    title: string;
    path: string;
    icon: JSX.ElementType;
    permission?: number
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
        permission: 6
    },
    {
        title: 'خروج',
        path: '/',
        icon: IconArrowAltLeftAlt,
    },
]