import { Button, Drawer, Loading, showToast } from '@shatel/ui-kit'
import { postModifyUserRoles } from '@src/api/endpoints/permissionsApi';
import { getAllUsers } from '@src/api/endpoints/usersApi';
import { IRoleAccess, IUser } from '@src/api/interface';
import DropDown from '@src/components/shared/DropDown';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IAssignRoleToUserDrawer {
    roleAccess: IRoleAccess[];
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AssignRoleToUserDrawer = (props: IAssignRoleToUserDrawer) => {
    const { open, setOpen, roleAccess } = props
    const { t } = useTranslation()
    const [selectUser, setSelectUser] = useState('');

    const { data: getUsers, isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: getAllUsers,
    });

    if (isLoading || !getUsers?.data) {
        return <Loading />
    }

    const resetForm = () => {
        setSelectUser('')
        closeDrawerHandler()
    }

    const handleSave = async () => {
        if (!selectUser || !roleAccess) {
            showToast('error', "لطفاً نقش و کاربر مورد نظر را انتخاب کنید.", {}, 'test');
            return;
        }

        try {
            await postModifyUserRoles({
                userName: selectUser,
                roleAccess: roleAccess
            });

            showToast('success', "عملیات ذخیره‌سازی با موفقیت انجام شد!", {}, 'test');

        } catch (error) {
            console.error("خطایی رخ داد در حین ذخیره‌سازی:", error);
            showToast('error', "متأسفانه خطایی در حین ذخیره‌سازی رخ داده است.");

        } finally {
            resetForm()
        }
    };

    const closeDrawerHandler = (() => {
        setOpen(false)
    })

    const radioButtonData = getUsers.data.map(({ userName }: IUser) => ({
        label: userName,
        value: userName,
    }));

    return (
        <Drawer anchor="left" onClose={closeDrawerHandler} title="افزودن نقش به کاربر" open={open}>
            <div className="flex flex-col gap-large">
                <DropDown
                    data={selectUser}
                    searchBox
                    radioButtonData={radioButtonData}
                    defaultLabel={t("manager.select-user")}

                    onChange={(e) => setSelectUser(e.target.value)}
                />
                <Button onClick={handleSave}>{t("manager.save")}</Button>
            </div>
        </Drawer>)
}

export default AssignRoleToUserDrawer