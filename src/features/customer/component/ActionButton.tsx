import { Button, cn, IconTrashLight, Paragraph } from '@shatel/ui-kit'
import { serviceType } from '@src/components/mockData.ts/mockCheckBoxData'
import DropDown from '@src/components/shared/DropDown'
import PermissionWrapper from '@src/components/shared/PermissionWrapper'

const ActionButton = () => {

  const handlerClick = (() => {
    alert("ثبت شد")
  })
  return (
    <div className='grid gap-medium'>
      <DropDown className='border-primary border-1' radioButtonData={serviceType} deafaultLabel="نوع سرویس" deafaultChecked={'checkbox-all-service'} searchBox />
      <div className='flex gap-medium items-center'>
        <Button
          variant="primary"
          className={cn("w-full rounded-small bg-action-success hover:bg-action-success")}
          placement='start'
          onClick={() => handlerClick()}
        >
          <Paragraph variant="p">ثبت تماس
          </Paragraph>

        </Button>

        <PermissionWrapper permissionId={7}>
          <Button
            variant="primary"
            className={cn("w-full rounded-small bg-main-brand-secondary hover:bg-main-brand-secondary")}
            placement='start'
            onClick={() => handlerClick()}
          >
            <Paragraph variant="p">تغییرات
            </Paragraph>

          </Button>
        </PermissionWrapper>

        <PermissionWrapper permissionId={5}>
          <IconTrashLight onClick={() => alert("پاک شد")} className='stroke-marketing-red fill-none stroke-2 cursor-pointer' />
        </PermissionWrapper>

      </div>
    </div>
  )
}

export default ActionButton