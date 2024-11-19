import { Divider, Paragraph, Switch } from '@shatel/ui-kit'
import { city, customerStatus } from '@src/components/mockData.ts/mockCheckBoxData'
import DropDown from '@src/components/shared/DropDown'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const DrawerAdvanceSearch = () => {
    const [checkedMyUser, setCheckedMyUser] = useState(false)
    const [checkedSpecialUser, setCheckedSpecialUser] = useState(false)
    const { t } = useTranslation()


    return (
        <div className='flex flex-col gap-medium'>
            <div className='flex flex-col gap-small bg-cta-secondary rounded-medium  p-medium '>
                <Switch
                    className="w-full"
                    checked={checkedMyUser}
                    label={<Paragraph variant="p1">{t("customer.my-customer")}</Paragraph>}
                    onChange={() => setCheckedMyUser(!checkedMyUser)}
                />
                <Switch
                    className="w-full"
                    checked={checkedSpecialUser}
                    label={<Paragraph variant="p1">{t("customer.special-customer")}</Paragraph>}
                    onChange={() => setCheckedSpecialUser(!checkedSpecialUser)}
                />

            </div>
            <Divider />
            <div className='flex flex-col gap-small bg-cta-secondary rounded-medium  p-medium '>
                <DropDown radioButtonData={city} defaultLabel={t("customer.city")} />
                <DropDown radioButtonData={customerStatus} defaultLabel={t("customer.company")} />
                <DropDown radioButtonData={customerStatus} defaultLabel={t("customer.centerType")} />
                <DropDown radioButtonData={customerStatus} defaultLabel={t("customer.serviceCenter")} />
            </div>
            <Divider />

        </div>
    )
}

export default DrawerAdvanceSearch