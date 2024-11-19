import { useState } from 'react';
import Filters from './Filters';
import Table from '@src/components/shared/Table';
import { columnsRolesData } from '@src/components/mockData.ts/mockGridData';
import { useQuery } from '@tanstack/react-query';
import { IGetRole, IResourceAccess, IRoleAccess, IUserAccess } from '@src/api/interface';
import { Button, Checkbox, cn, IconPipe, IconSettingLineLight, Loading, Paragraph } from '@shatel/ui-kit';
import AssignRoleToUserDrawer from './AssignRoleToUserDrawer';
import RoleActionsModal from './RoleActionsModal';
import RoleUsersModal from './RoleUsersModal';
import { getAllRoles } from '@src/api/endpoints/rolesApi';
import { getRoleResources, getRoleUsers } from '@src/api/endpoints/permissionsApi';

const RolesTable = () => {
    const { data: allRoles, isLoading } = useQuery({
        queryKey: ['allRoles'],
        queryFn: getAllRoles,
    });

    const [filter, setFilter] = useState('All');
    const [permissionFilter, setPermissionFilter] = useState('');
    const [openAllocation, setOpenAllocation] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState<IRoleAccess[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedAccesses, setSelectedAccesses] = useState<IResourceAccess[]>([]);
    const [openUserModal, setOpenUserModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<IUserAccess[]>([]);
    const [roleName, setRoleName] = useState('');

    if (isLoading || !allRoles?.data) return <Loading />;

    const handleRoleCheckboxChange = (item: IGetRole, isChecked: boolean) => {
        setSelectedRoles((prevSelected) =>
            isChecked
                ? [...prevSelected, { roleName: item.roleName, hasAccess: true }]
                : prevSelected.filter((perm) => perm.roleName !== item.roleName)
        );
    };

    const rolesRowData = Object.values(allRoles.data).map(({ id, roleName }: IGetRole) => ({
        select: (
            <Checkbox
                label={<Paragraph variant="p1">{roleName}</Paragraph>}
                key={roleName}
                name={roleName}
                checked={selectedRoles.some((perm) => perm.roleName === roleName)}
                onChange={(e) => handleRoleCheckboxChange({ id, roleName }, e.target.checked)}
            />
        ),
        action: (
            <IconSettingLineLight
                onClick={() => handlerOpenModal(roleName)}
                className={cn('stroke-main-primary fill-background-tertiary cursor-pointer')} />
        ),
        roleUsers: (
            <IconPipe
                onClick={() => handlerOpenUsersModal(roleName)}
                className={cn('stroke-main-primary fill-background-tertiary cursor-pointer')} />
        )
    }));

    const handlerOpenModal = async (roleName: string) => {
        try {
            const { data: resources } = await getRoleResources(roleName);
            if (resources) {
                setSelectedAccesses(resources);
            }
            setRoleName(roleName);
            setOpenModal(true);
        } catch (error) {
            console.log('Error fetching resources:', error);
        }
    };

    const handlerOpenUsersModal = async (roleName: string) => {
        try {
            const { data: users } = await getRoleUsers(roleName)
            if (users) {
                setSelectedUsers(users)
            }

            setRoleName(roleName);
            setOpenUserModal(true);

        } catch (error) {
            console.log('Error fetching resources:', error);
        }
    };

    const filteredRowData = rolesRowData.filter((item) =>
        (filter === 'All' || item.select.key?.toLowerCase().includes(filter.toLowerCase())) &&
        item.select.key?.toLowerCase().includes(permissionFilter.toLowerCase())
    );

    return (
        <>
            <Filters
                filterPage={filter}
                defaultLabel="جستجو"
                options={Object.values(allRoles.data).map((role) => ({
                    label: role.roleName,
                    value: role.roleName,
                }))}
                onChangeDropDown={(e) => setFilter(e.target.value)}
                onChangeSearch={(e) => setPermissionFilter(e.target.value)}
            />
            <Table columns={columnsRolesData} rowData={filteredRowData} itemsPerPage={5} />
            <Button
                placement="end"
                className="w-1/7 rounded-small"
                onClick={() => setOpenAllocation(true)}
            >
                تخصیص نقش به کاربر
            </Button>

            <AssignRoleToUserDrawer open={openAllocation} setOpen={setOpenAllocation} roleAccess={selectedRoles} />

            {openModal && (
                <RoleActionsModal setSelectedAccesses={setSelectedAccesses} setOpenModal={setOpenModal} open={openModal} roleName={roleName} resourceAccess={selectedAccesses} />
            )}

            {openUserModal && (
                <RoleUsersModal
                    open={openUserModal} users={selectedUsers} setSelectedUsers={setSelectedUsers} roleName={roleName} setOpenModal={setOpenUserModal} />
            )

            }
        </>
    );
}
export default RolesTable;
