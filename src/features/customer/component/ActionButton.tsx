import { Button, cn, IconTrashLight, Paragraph } from '@shatel/ui-kit'
import { serviceType } from '@src/components/mockData.ts/mockCheckBoxData'
import DropDown from '@src/components/shared/DropDown'
import PermissionWrapper from '@src/components/shared/PermissionWrapper'
import { usePermissions } from '@src/hooks/usePermissions'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ActionButton = () => {
  const { Resources } = usePermissions()

  const { btnDeletecustomer, btnEdithcustomer } = Resources.Customer
  const [selectService, setSelectService] = useState('checkbox-all-service');
  const { t } = useTranslation()

  const handlerClick = (() => {
    alert(t("customer.registerCall"))
  })

  return (
    <div className='grid gap-medium'>
      <DropDown className='border-primary border-1'
        data={selectService}
        onChange={e => setSelectService(e.target.value)}
        radioButtonData={serviceType}
        defaultLabel={t("customer.serviceType")} searchBox />
      <div className='flex gap-medium items-center'>
        <Button
          variant="primary"
          className={cn("w-full rounded-small bg-action-success hover:bg-action-success")}
          placement='start'
          onClick={() => handlerClick()}
        >
          <Paragraph variant="p">
            {t("customer.registerCall")}
          </Paragraph>

        </Button>

        <PermissionWrapper permissionKey={btnEdithcustomer}>
          <Button
            variant="primary"
            className={cn("w-full rounded-small bg-main-brand-secondary hover:bg-main-brand-secondary")}
            placement='start'
            onClick={() => handlerClick()}
          >
            <Paragraph variant="p">
              {t("customer.editChanges")}
            </Paragraph>

          </Button>
        </PermissionWrapper>

        <PermissionWrapper permissionKey={btnDeletecustomer}>
          <IconTrashLight onClick={() => alert("پاک شد")} className='stroke-marketing-red fill-none stroke-2 cursor-pointer' />
        </PermissionWrapper>

      </div>
    </div>
  )
}

export default ActionButton