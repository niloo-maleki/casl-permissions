import { ReactComponent as SearchIcon } from '@assets/svg/Search_alt_duotone_line.svg'
import { cn, Loading, IconFilterAltLight } from '@shatel/ui-kit'
import PermissionWrapper from '@src/components/shared/PermissionWrapper'
import { useContext, useState } from 'react'
import { AuthContext } from '@src/context/AuthContext'
import { usePermissions } from '@src/hooks/usePermissions'
import FilterDrawer from './FilterDrawer'
import SearchDrawer from './SearchDrawer'
const UsersGrid = () => {
    const { role } = useContext(AuthContext);
    const { Resources } = usePermissions()
    const [openSearch, setOpenSearch] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)

    if (!role) {
        return (
            <div>
                <Loading></Loading>
            </div>
        );
    }

    const handlerSearch = () => {
        setOpenSearch(true)
    }

    const handlerFilter = () => {
        setOpenFilter(true)
    }

    return (
        <div className="grid">
            <div className="flex gap-small">
                
                <button className={cn('flex items-center border-1 rounded-small border-typography-heading p-xsmall bg-main-white',
                    'hover:bg-hover-primary'
                )}
                    onClick={handlerSearch}
                >
                    <SearchIcon className={cn("stroke-main-brand-primary stroke-2")} />
                </button>

                <PermissionWrapper
                    permissionKey={Resources.Customer.btnAdvancedSearch}
                >
                    <button className={cn('flex items-center border-1 rounded-small border-typography-heading p-xsmall',
                        'hover:bg-hover-primary'
                    )}
                        onClick={handlerFilter}
                    >
                        <IconFilterAltLight className={cn("fill-main-brand-primary stroke-main-brand-primary")} />

                    </button>
                </PermissionWrapper>
            </div>
            <FilterDrawer open={openFilter} setOpen={setOpenFilter} />

            <SearchDrawer open={openSearch} setOpen={setOpenSearch} />

        </div>
    )
}

export default UsersGrid