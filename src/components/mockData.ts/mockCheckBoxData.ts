import { RadioButtonData } from "../shared/DropDown"

export const customerStatus = [
    {
        label: 'همه کاربران',
        value: 'checkbox-all-user'
    },
    {
        label: 'آماده نصب',
        value: 'checkbox-ready-install'
    },
    {
        label: 'در حال استفاده',
        value: 'checkbox-in-use'
    },
]

export const serviceType: RadioButtonData[] = [
    {
        label: 'همه سرویس ها',
        value: 'checkbox-all-service'
    },
    {
        label: 'ADSL',
        value: 'checkbox-ADSL-services'
    },
    {
        label: 'Dedicated',
        value: 'checkbox-dedicated-services'
    },
    {
        label: 'DataCenter',
        value: 'checkbox-dataCenter-services',
        permission: { page: 'Public', key: 'checkboxDataCenter' }

    },
]

export const city = [
    {
        label: 'همه شهرها',
        value: 'checkbox-tehran'
    },
    {
        label: 'مشهد',
        value: 'checkbox-mashhad'
    },
    {
        label: 'یزد',
        value: 'checkbox-yazd'
    },
    {
        label: 'اصفهان',
        value: 'checkbox-esfehan'
    },
]


 