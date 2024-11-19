import { TextField, Button, cn, Paragraph, IconSort, Drawer, Loading } from '@shatel/ui-kit'
import PermissionWrapper from '@src/components/shared/PermissionWrapper'
import { useContext, useState } from 'react'
import DropDown from '@src/components/shared/DropDown'
import { AuthContext } from '@src/context/AuthContext'
import DrawerAdvanceSearch from './DrawerAdvanceSearch'
import { customerStatus, serviceType } from '@src/components/mockData.ts/mockCheckBoxData'
import { useTranslation } from 'react-i18next'
import { usePermissions } from '@src/hooks/usePermissions'

const SearchUser = () => {
    const { role } = useContext(AuthContext);
    const { Resources } = usePermissions()
    const [openSearch, setOpenSearch] = useState(false)
    const [service, setService] = useState('');
    const [status, setStatus] = useState('');
    const { t } = useTranslation()

    if (!role) {
        return (
            <div>
                <Loading></Loading>
            </div>
        );
    }


    const handlerClick = (role: string) => {
        alert("Handler for " + role);
    };

    const handlerAdvanceSearch = () => {
        setOpenSearch(true)
    }

    return (
        <div className="flex gap-small">
            <div className="grid grid-cols-3 gap-small">
                <TextField
                    label={t("customer.searchCode")}
                    className='bg-main-white'
                ></TextField>

                <DropDown data={status} radioButtonData={customerStatus} defaultLabel={t("customer.status")} onChange={e => setStatus(e.target.value)} />

                <DropDown data={service} radioButtonData={serviceType} defaultLabel={t("customer.serviceType")} searchBox onChange={e => setService(e.target.value)} />
            </div>

            <div className="flex gap-small">
                <Button
                    variant="primary"
                    className={cn("w-fit rounded-small bg-main-brand-primary")}
                    placement='start'
                    onClick={() => handlerClick(role)}
                >
                    <Paragraph variant="p">
                        {t("customer.search")}
                    </Paragraph>
                </Button>

                <PermissionWrapper
                    permissionKey={Resources.Customer.btnAdvancedSearch}
                >
                    <Button
                        variant="primary"
                        className={cn("w-fit rounded-small")}
                        placement='start'
                        onClick={handlerAdvanceSearch}
                    >
                        <Paragraph variant="p">
                            {t("customer.advancedSearch")}

                        </Paragraph>
                        <IconSort />
                    </Button>
                </PermissionWrapper>

                <Drawer
                    anchor="left"
                    onClose={() => setOpenSearch(false)}
                    title={t("customer.advancedSearch")}
                    open={openSearch}
                >
                    <DrawerAdvanceSearch />
                </Drawer>
            </div>

        </div>
    )
}

export default SearchUser