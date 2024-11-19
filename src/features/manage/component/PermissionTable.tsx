import { ReactNode, useMemo, useState } from 'react';
import Table from '@src/components/shared/Table';
import { columnsPermissionData } from '@src/components/mockData.ts/mockGridData';
import { IResourceAccess, PermissionResource } from '@src/api/interface';
import { Loading, Checkbox, Paragraph } from '@shatel/ui-kit';
import { useQuery } from '@tanstack/react-query';
import AccessFilters from './AccessFilters';
import { getAllResource } from '@src/api/endpoints/resourcesApi';

interface IPermissionTable {
    selectedAccesses: IResourceAccess[];
    onCheckboxChange: (item: IResourceAccess, isChecked: boolean) => void;
    children?: ReactNode
}

const PermissionTable = (props: IPermissionTable) => {
    const { selectedAccesses, onCheckboxChange, children } = props;

    const [filter, setFilter] = useState('All');
    const [permissionFilter, setPermissionFilter] = useState('');

    const { data: allResources, isLoading } = useQuery({
        queryKey: ['allResources'],
        queryFn: getAllResource,
    });

    const permissionsRowData = useMemo(() => {
        if (!allResources?.data) return [];

        return Object.values(allResources.data).flatMap((permissions) =>
            Object.values(permissions).map(({ name, description, page }: PermissionResource) => ({
                name: (
                    <Checkbox
                        label={<Paragraph variant="p1">{name}</Paragraph>}
                        name={name}
                        key={name}
                        checked={selectedAccesses.some((perm) => perm.resourceName === name && perm.hasAccess)}
                        onChange={(e) =>
                            onCheckboxChange({ resourceName: name, hasAccess: e.target.checked }, e.target.checked)
                        }
                    />
                ),
                page: page.name,
                description,
            }))
        );
    }, [allResources, selectedAccesses, onCheckboxChange]);

    if (isLoading || !allResources?.data) {
        return <Loading />;
    }

    const filterOptions = Object.keys(allResources.data).map((item) => ({
        label: item,
        value: item,
    }));



    const filteredRowData = permissionsRowData.filter(
        (item) =>
            (filter === 'All' || item.page.toLowerCase().includes(filter.toLowerCase())) &&
            item.page.toLowerCase().includes(permissionFilter.toLowerCase())
    );

    return (
        <>

            <div className="flex flex-col gap-medium">
                <AccessFilters
                    filterOptions={filterOptions}
                    onFilterChange={setFilter}
                    onSearchChange={setPermissionFilter}
                    searchValue={permissionFilter}
                />

                <Table columns={columnsPermissionData} rowData={filteredRowData} itemsPerPage={5} />
            </div>
            {children}
        </>
    );
};

export default PermissionTable;
