import { Button, Modal } from '@shatel/ui-kit'
import PermissionTable from './PermissionTable'
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { IResourceAccess } from '@src/api/interface';
import { getPermission, postModifyRoleResources } from '@src/api/endpoints/permissionsApi';
import { AuthContext } from '@src/context/AuthContext';

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
    const { role, setPermissions, permissions } = useContext(AuthContext);

    const handleCheckboxChange = (item: IResourceAccess, isChecked: boolean) => {
        setSelectedAccesses((prevSelected) =>
            isChecked
                ? [...prevSelected, item]
                : prevSelected.filter((perm) => perm.resourceName !== item.resourceName)
        );

        setNewSelectedAccesses([...newSelectedAccesses, item])
    };
    useEffect(() => {
        console.log('permissions', permissions)
    }, [])


    const updateNewPermissionForUser = async () => {
        if (newSelectedAccesses?.length > 0 && role) {
            console.log('newSelectedAccesses', newSelectedAccesses);
            try {
                const { data } = await getPermission(role);
                if (data) {
                    setPermissions(data.permissions);
                }
            } catch (error) {
                console.error('Error fetching permissions:', error);
            }
        } else {
            console.log('No new accesses selected or role is missing.');
        }
    };

    const submitChanges = async () => {
        await postModifyRoleResources({
            resourceAccess: newSelectedAccesses,
            roleName: roleName
        });

        updateNewPermissionForUser()
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