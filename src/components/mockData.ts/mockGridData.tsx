import { IconCopyLight, IconPhoneFill } from '@shatel/ui-kit';
import { RowData } from '../shared/interface';
import ActionButton from '@src/features/customer/component/ActionButton';

export const columnsPermissionData = [
    {
        field: 'name',
        headerName: 'نام دسترسی',
        headerClassName: '',
    },
    {
        field: 'page',
        headerName: 'صفحه',
        headerClassName: '',
    },
    {
        field: 'description',
        headerName: 'توضیح دسترسی',
        headerClassName: '',
    },
];

export const columnsRolesData = [
    {
        field: 'select',
        headerName: 'نام نقش',
        headerClassName: '',
    },
    {
        field: 'action',
        headerName: 'مشاهده دسترسی های موجود ',
        headerClassName: '',
    }, 
    {
        field: 'roleUsers',
        headerName: 'مشاهده کاربران دارای این نقش ',
        headerClassName: '',
    }, 
    
];

export const columnsRoleUsersData = [
    {
        field: 'select',
        headerName: 'نام کاربر',
        headerClassName: '',
    },
];

export const columnsResource = [
    {
        field: 'name',
        headerName: 'نام دسترسی',
        headerClassName: '',
    },
    {
        field: 'description',
        headerName: 'توضیح دسترسی',
        headerClassName: '',
    },
    {
        field: 'select',
        headerName: '',
        headerClassName: '',
    },

];

export const columnsTranslationData = [
    {
        field: 'key',
        headerName: 'کلید ترجمه',
        headerClassName: '',
    },
    {
        field: 'faTranslate',
        headerName: 'ترجمه فارسی',
        headerClassName: '',
    },
    {
        field: 'action',
        headerName: 'عملیات',
        headerClassName: '',
    },
];

export const columnsData = [
    {
        field: 'user',
        headerName: 'اطلاعات مشترک',
        headerClassName: '',
    },
    {
        field: 'phoneNumber',
        headerName: 'شماره تلفن',
        headerClassName: '',
    },
    {
        field: 'serviceType',
        headerName: 'بستر ارایه سرویس',
        headerClassName: '',
    },
    {
        field: 'financialStatus',
        headerName: 'تراز مالی',
        headerClassName: '',
    },
    {
        field: 'action',
        headerName: 'عملیات',
        headerClassName: '',
    },
];

export const rowDatas: RowData[] = [
    {
        user: [{ value: 'امیر احمدی' },
        {
            value: '42060648',
            icon: <IconCopyLight className='fill-main-white stroke-main-brand-primary cursor-pointer' onClick={() => alert("کپی شد")} />
        },
        {
            value: '2013518421',
            icon: <IconCopyLight className='fill-main-white stroke-main-brand-primary cursor-pointer' onClick={() => alert("کپی شد")} />
        },

        ],
        phoneNumber: [
            { value: 'FairBronze4096nfg-3' },
            { value: '09123456789', icon: <IconPhoneFill className='fill-main-white stroke-2 stroke-main-brand-primary' /> },
            { value: '0 ریال' },
        ],
        serviceType: 'تلفن ثابت',
        financialStatus: '-154,420,000',
        action: () => (
            <ActionButton />
        ),
    },

    {
        user: [{ value: 'مهدی فلسفی' },
        {
            value: '42060648',
            icon: <IconCopyLight className='fill-main-white stroke-main-brand-primary cursor-pointer' onClick={() => alert("کپی شد")} />
        },
        {
            value: '2013518421',
            icon: <IconCopyLight className='fill-main-white stroke-main-brand-primary cursor-pointer' onClick={() => alert("کپی شد")} />
        },

        ],
        phoneNumber: [
            { value: 'FairBronze4096nfg-3' },
            { value: '09123456789', icon: <IconPhoneFill className='fill-main-white stroke-2 stroke-main-brand-primary' /> },
            { value: '0 ریال' },
        ],
        serviceType: 'تلفن ثابت',
        financialStatus: '-154,420,000',
        action: () => (
            <ActionButton />
        ),
    },

    {
        user: [{ value: 'فاطمه جول' },
        {
            value: '42060648',
            icon: <IconCopyLight className='fill-main-white stroke-main-brand-primary cursor-pointer' onClick={() => alert("کپی شد")} />
        },
        {
            value: '2013518421',
            icon: <IconCopyLight className='fill-main-white stroke-main-brand-primary cursor-pointer' onClick={() => alert("کپی شد")} />
        },

        ],
        phoneNumber: [
            { value: 'FairBronze4096nfg-3' },
            { value: '09123456789', icon: <IconPhoneFill className='fill-main-white stroke-2 stroke-main-brand-primary' /> },
            { value: '0 ریال' },
        ],
        serviceType: 'تلفن ثابت',
        financialStatus: '-154,420,000',
        action: () => (
            <ActionButton />
        ),
    },

    {
        user: [{ value: 'نیلا نینایی' },
        {
            value: '42060648',
            icon: <IconCopyLight className='fill-main-white stroke-main-brand-primary cursor-pointer' onClick={() => alert("کپی شد")} />
        },
        {
            value: '2013518421',
            icon: <IconCopyLight className='fill-main-white stroke-main-brand-primary cursor-pointer' onClick={() => alert("کپی شد")} />
        },

        ],
        phoneNumber: [
            { value: 'FairBronze4096nfg-3' },
            { value: '09123456789', icon: <IconPhoneFill className='fill-main-white stroke-2 stroke-main-brand-primary' /> },
            { value: '0 ریال' },
        ],
        serviceType: 'تلفن ثابت',
        financialStatus: '-154,420,000',
        action: () => (
            <ActionButton />
        ),
    },

    {
        user: 'محمدرضا شیرزاد',
        phoneNumber: [
            { value: '2191322427', icon: <IconPhoneFill className='fill-main-white stroke-2 stroke-main-brand-primary' /> },
        ],
        subscriptionCode: 42060649,
        serviceType: 'اینترنت',
        financialStatus: '0',
        action: () => (
            <ActionButton />
        ),
    },
];
