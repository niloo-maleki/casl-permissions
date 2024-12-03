import { Title, Divider, IconAddSquareLight, Paragraph, SegmentedControl, Button } from '@shatel/ui-kit';
import { useAccessPage } from '@src/hooks/useAccessPage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPermissionDrawer from './component/AddPermissionDrawer';
import { usePermissions } from '@src/hooks/usePermissions';
import { useTranslation } from 'react-i18next';
import PermissionTable from './component/PermissionTable';
import RolesTable from './component/RolesTable';
import { IResourceAccess } from '@src/api/interface';
import AccessAllocationDrawer from './component/AccessAllocationDrawer';

const ManagePage = () => {
    const { Resources } = usePermissions();
    const accessPage = useAccessPage(Resources.Manager.pageManager);
    const pageName = Object.keys(Resources);
    const { t } = useTranslation();

    const navigate = useNavigate();
    const [openAddNewKey, setOpenAddNewKey] = useState(false);
    const [access, setAccess] = useState('permissionAccess');
    const [openAccess, setOpenAccess] = useState(false)
    const [selectedAccesses, setSelectedAccesses] = useState<IResourceAccess[]>([]);

    useEffect(() => {
        if (!accessPage) {
            navigate('/');
        }
    }, [navigate, accessPage]);

    const handleCheckboxChange = (item: IResourceAccess, isChecked: boolean) => {
        setSelectedAccesses((prevSelected) =>
            isChecked
                ? [...prevSelected, item]
                : prevSelected.filter((access) => access.resourceName !== item.resourceName)
        );
    };

    const accessDrawerOpenhandler = (() => {
        setOpenAccess(true)
    })

    return (
        <div className="flex flex-col gap-medium w-full">
            <div className="flex w-full justify-between">
                <Title variant="h4">{t('manager.management')}</Title>

                {process.env.NODE_ENV === 'development' && (
                    <button
                        onClick={() => setOpenAddNewKey(true)}
                        className="cursor-pointer flex gap-small items-center"
                    >
                        <Paragraph variant="p">افزودن دسترسی جدید</Paragraph>
                        <IconAddSquareLight className="cursor-pointer fill-main-white stroke-main-brand-secondary hover:fill-marketing-orange stroke-2" />
                    </button>
                )}
            </div>
            <Divider />


            <div className="flex flex-col gap-medium">
                <SegmentedControl
                    className="w-fit h-12"
                    background="white"
                    onChange={setAccess}
                    options={[
                        { id: 'permissionAccess', value: 'تخصیص دسترسی' },
                        { id: 'roleAccess', value: 'تخصیص نقش' },
                        { id: 'userAccess', value: 'حوزه دسترسی کاربر' },
                    ]}
                    orientation="horizontal"
                    selected={access}
                />

                {access === 'permissionAccess' && (
                    <PermissionTable
                        selectedAccesses={selectedAccesses}
                        onCheckboxChange={handleCheckboxChange}
                    >
                        <Button
                            placement="end"
                            className="w-1/7 rounded-small"
                            onClick={accessDrawerOpenhandler}
                        >
                            تخصیص دسترسی به نقش
                        </Button>
                        <AccessAllocationDrawer
                            open={openAccess}
                            setOpen={setOpenAccess}
                            resourceAccess={selectedAccesses}
                        />
                    </PermissionTable>
                )}
                {access === 'roleAccess' && <RolesTable />}
            </div>

            <AddPermissionDrawer open={openAddNewKey} setOpen={setOpenAddNewKey} pageName={pageName} />
        </div>
    );
};

export default ManagePage;
