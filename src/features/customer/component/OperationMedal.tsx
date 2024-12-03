import { Button, cn, IconTrashLight, Modal, Paragraph } from '@shatel/ui-kit';
import PermissionWrapper from '@src/components/shared/PermissionWrapper';
import { usePermissions } from '@src/hooks/usePermissions';
import { t } from 'i18next';

interface IOperationMedal {
    setOpenModal: (a: boolean) => void,
    open: boolean,

}

const OperationMedal = (props: IOperationMedal) => {
    const { open, setOpenModal } = props;
    const { Resources } = usePermissions()

    const { btnDeletecustomer, btnEdithcustomer } = Resources.Customer

    const handlerClick = (() => {
        alert('click')
    })

    return (
        <Modal
            className="gap-large"
            title={`عملیات`}
            open={open}
            onClose={() => setOpenModal(false)}
        >
            <div className='grid grid-cols-5 justify-center items-center gap-small'>
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

        </Modal>)
}

export default OperationMedal