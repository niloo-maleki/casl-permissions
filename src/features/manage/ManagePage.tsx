import { Title, Divider } from '@shatel/ui-kit'
import { useAccessPage } from '@src/hooks/useAccessPage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@src/components/shared/Table';
import { columnsPermissionData } from '@src/components/mockData.ts/mockGridData';
import { getAllResource } from '@src/api/api';
import { AllResourceResolve } from '@src/api/interface';

const ManagePage = () => {

    const accessPage = useAccessPage('6')
    const navigate = useNavigate()
    const [response, setResponse] = useState<AllResourceResolve[]>([])

    const fetchResource = (async () => {
        const { data } = await getAllResource()

        if (data) {
            setResponse(data)
        }
    })

    useEffect(() => {
        fetchResource()
    }, [])
    
    useEffect(() => {
        if (!accessPage) {
            return (
                navigate('/')
            )
        }

    }, [accessPage])

    const rowData = response.map(item => ({
        id: item.id,
        name: item.name
    }));

    return (
        <div className="flex flex-col gap-xsmall w-full">
            <div className="flex w-full justify-between">
                <Title variant="h4">مدیریت</Title>
            </div>
            <Divider />

            <Title variant="h1" className="text-action-warning">
                دسترسی به صفحه مدیریت
            </Title>

            <Table columns={columnsPermissionData} rowData={rowData} itemsPerPage={10} />
        </div>
    )
}

export default ManagePage