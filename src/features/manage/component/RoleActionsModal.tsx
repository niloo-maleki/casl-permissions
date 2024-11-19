import { Button, Modal } from '@shatel/ui-kit'
import PermissionTable from './PermissionTable'
import { Dispatch, SetStateAction, useState } from 'react';
import { IResourceAccess } from '@src/api/interface';
import { postModifyRoleResources } from '@src/api/endpoints/permissionsApi';

interface IRoleActionsModal {
    roleName: string,
    resourceAccess: IResourceAccess[],
    setSelectedAccesses: Dispatch<SetStateAction<IResourceAccess[]>>; // تغییر نوع
    setOpenModal: (a: boolean) => void,
    open: boolean

}
const RoleActionsModal = (props: IRoleActionsModal) => {
    const { roleName, resourceAccess, setSelectedAccesses, open, setOpenModal } = props
    const [newSelectedAccesses, setNewSelectedAccesses] = useState<IResourceAccess[]>([]);

    const handleCheckboxChange = (item: IResourceAccess, isChecked: boolean) => {
        setSelectedAccesses((prevSelected) =>
            isChecked
                ? [...prevSelected, item]
                : prevSelected.filter((perm) => perm.resourceName !== item.resourceName)
        );

        setNewSelectedAccesses([...newSelectedAccesses, item])
    };

    const submitChanges = async () => {
        await postModifyRoleResources({
            resourceAccess: newSelectedAccesses,
            roleName: roleName
        });
        setNewSelectedAccesses([])
        setOpenModal(false)
    };

    return (
        <>
            <Modal
                className="gap-large"
                title={`دسترسی‌های نقش ${roleName}`}
                open={open}
                onClose={() => setOpenModal(false)}
            >
                <PermissionTable
                    selectedAccesses={resourceAccess}
                    onCheckboxChange={handleCheckboxChange}
                />
                <Button
                    placement="end"
                    className="w-1/7 rounded-small"
                    onClick={submitChanges}
                >
                    ثبت تغییرات
                </Button>
            </Modal>
        </>
    )
}

export default RoleActionsModal