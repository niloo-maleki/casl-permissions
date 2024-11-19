
import { Divider, Paragraph, ProgressChart, Title } from '@shatel/ui-kit';
import PermissionWrapper from '@src/components/shared/PermissionWrapper';
import { AuthContext } from '@src/context/AuthContext';
import { usePermissions } from '@src/hooks/usePermissions';
import { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { role } = useContext(AuthContext);
    const { Resources } = usePermissions()
    const { t } = useTranslation()

    return (
        <div className="flex flex-col gap-xsmall w-full">
            <div className="flex w-full justify-between">
                <Title variant="h4">{t("dashboard.title")}</Title>
            </div>
            <Divider />

            <Title variant="h1" className="text-action-warning">
                <Trans i18nKey={"dashboard.welcome"} values={{
                    role: role
                }}/>
            </Title>

            <div className='flex gap-xlarge mt-large'>

                <ProgressChart size='large' progress={40}>
                    <div className='flex flex-col justify-between items-center h-1/2'>
                        <Title variant="h4">
                            40%
                        </Title>
                        <Paragraph variant='p2' className='text-subtext1'>
                            {t("dashboard.subscriberReadyInstall")}
                        </Paragraph>
                    </div>

                </ProgressChart>

                <PermissionWrapper
                    permissionKey={Resources.Dashboard.chartSales}
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