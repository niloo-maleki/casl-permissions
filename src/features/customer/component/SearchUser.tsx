import { TextField, Button, cn, Paragraph, IconSort, Drawer, Loading } from '@shatel/ui-kit'
import PermissionWrapper from '@src/components/shared/PermissionWrapper'
import { useContext, useState } from 'react'
import DropDown from '@src/components/shared/DropDown'
import { AuthContext } from '@src/context/AuthContext'
import DrawerAdvanceSearch from './DrawerAdvanceSearch'
import { customerStatus, serviceType } from '@src/components/mockData.ts/mockCheckBoxData'

const SearchUser = () => {
    const { role } = useContext(AuthContext);
    const [openSearch, setOpenSearch] = useState(false)

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
                    label='کد اشتراک شناسه' className='bg-main-white'
                ></TextField>

                <DropDown radioButtonData={customerStatus} deafaultLabel="وضعیت مشترک" />

                <DropDown radioButtonData={serviceType} deafaultLabel="نوع سرویس" deafaultChecked={'checkbox-all-service'} searchBox />
            </div>

            <div className="flex gap-small">
                <Button
                    variant="primary"
                    className={cn("w-fit rounded-small bg-main-brand-primary")}
                    placement='start'
                    onClick={() => handlerClick(role)}
                >
                    <Paragraph variant="p">جستجو
                    </Paragraph>

                </Button>

                <PermissionWrapper
                    permissionId={2}
                >
                    <Button
                        variant="primary"
                        className={cn("w-fit rounded-small")}
                        placement='start'
                        onClick={handlerAdvanceSearch}
                    >
                        <Paragraph variant="p">جستجوی پیشرفته
                        </Paragraph>
                        <IconSort />
                    </Button>
                </PermissionWrapper>

                <Drawer
                    anchor="left"
                    onClose={() => setOpenSearch(false)}
                    title="جستجوی پیشرفته"
                    open={openSearch}
                >
                    <DrawerAdvanceSearch />
                </Drawer>
            </div>

        </div>
    )
}

export default SearchUser