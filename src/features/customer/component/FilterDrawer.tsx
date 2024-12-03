import { Button, cn, Divider, Drawer, Paragraph, Switch } from '@shatel/ui-kit'
import { city, customerStatus, serviceType } from '@src/components/mockData.ts/mockCheckBoxData'
import DropDown from '@src/components/shared/DropDown'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface FilterDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const FilterDrawer = (props: FilterDrawerProps) => {
    const { open, setOpen } = props
    const [checkedMyUser, setCheckedMyUser] = useState(false)
    const [checkedSpecialUser, setCheckedSpecialUser] = useState(false)
    const [service, setService] = useState('');
    const [status, setStatus] = useState('');
    const { t } = useTranslation()

    const handlerFilter = () => {
        console.log('salamm')
        setOpen(false)

    }

    return (
        <Drawer
            anchor="left"
            onClose={() => setOpen(false)}
            title={t("customer.filter")}
            open={open}
        >
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

                    <DropDown data={status} radioButtonData={customerStatus} defaultLabel={t("customer.status")} onChange={e => setStatus(e.target.value)} />

                    <DropDown data={service} radioButtonData={serviceType} defaultLabel={t("customer.serviceType")} searchBox onChange={e => setService(e.target.value)} />
                    <DropDown radioButtonData={customerStatus} defaultLabel={t("customer.company")} />
                    <DropDown radioButtonData={customerStatus} defaultLabel={t("customer.centerType")} />
                    <DropDown radioButtonData={customerStatus} defaultLabel={t("customer.serviceCenter")} />
                </div>

                <Button
                    variant="primary"
                    className={cn("rounded-small bg-main-brand-primary")}
                    placement='end'
                    onClick={handlerFilter}
                >
                    <Paragraph variant="p">
                        {t("customer.filter")}
                    </Paragraph>
                </Button>
            </div>
        </Drawer>
    )
}

export default FilterDrawer