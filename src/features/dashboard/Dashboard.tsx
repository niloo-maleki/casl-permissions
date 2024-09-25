
import { Divider, Paragraph, ProgressChart, Title } from '@shatel/ui-kit';
import PermissionWrapper from '@src/components/shared/PermissionWrapper';
import { AuthContext } from '@src/context/AuthContext';
import { useContext } from 'react';

const Dashboard = () => {
    const { role } = useContext(AuthContext);

    return (
        <div className="flex flex-col gap-xsmall w-full">
            <div className="flex w-full justify-between">
                <Title variant="h4">داشبورد</Title>
            </div>
            <Divider />

            <Title variant="h1" className="text-action-warning">
                Welcome to CRM {role}
            </Title>

            <div className='flex gap-xlarge mt-large'>

                <ProgressChart size='large' progress={40}>
                    <div className='flex flex-col justify-between items-center h-1/2'>
                        <Title variant="h4">
                            40%
                        </Title>
                        <Paragraph variant='p2' className='text-subtext1'>
                            مشترک آماده نصب
                        </Paragraph>
                    </div>

                </ProgressChart>

                <PermissionWrapper
                    permissionId={4}
                >
                    <ProgressChart size='large' progress={60}>
                        <div className='flex flex-col justify-between items-center h-1/2'>
                            <Title variant="h4">
                                60%
                            </Title>
                            <Paragraph variant='p2' className='text-subtext1'>
                                {role === 'hossein' ? 'فروش این ماه' : 'فروش این ماه شما'} 
                            </Paragraph>
                        </div>
                    </ProgressChart>
                </PermissionWrapper>
            </div>

        </div>
    )
}

export default Dashboard