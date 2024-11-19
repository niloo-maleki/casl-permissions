import { useNavigate } from 'react-router-dom';
import { MenuItem, navigationItems } from './navigationItems';
import { cn, Paragraph } from '@shatel/ui-kit';
import { AuthContext } from '@src/context/AuthContext';
import { Fragment, useContext } from 'react';
import PermissionWrapper from '@src/components/shared/PermissionWrapper';
import { getPermissionKey } from '@src/helper/helper';
import { usePermissions } from '@src/hooks/usePermissions';

const Menu = () => {
    const navigate = useNavigate();
    const { setRole, setPermissions } = useContext(AuthContext);
    const { Resources } = usePermissions()

    const handleLogout = () => {
        setRole("");
        setPermissions([]);
        localStorage.clear()
    };

    const handlerClick = ((path: string) => {
        if (path === '/') {
            handleLogout();
        }
        navigate(path)
    })

    const renderButtonMeno = (({ icon: Icon, path, title }: MenuItem) => {
        const isActive = location.pathname === path;

        return (
            <button
                onClick={() => handlerClick(path)}
                className={cn('flex gap-xsmall items-center h-14 rounded-medium p-medium',
                    'hover:bg-cta-secondary',
                    isActive && 'bg-cta-secondary')}
            >
                <Icon className={cn('stroke-main-primary fill-background-tertiary ')} />
                <Paragraph variant='p1'>{title}</Paragraph>
            </button>
        )
    })

    return (
        <menu className='flex flex-col p-small w-52 gap-xsmall bg-cta-focus-primary border-l-1 border-primary'>
            {navigationItems.map((data: MenuItem) => {
                const { title, permission } = data
                
                return (
                    <Fragment key={title}>
                        {permission ?
                            <PermissionWrapper
                                permissionKey={getPermissionKey(Resources,permission)}
                            >
                                {renderButtonMeno(data)}
                            </PermissionWrapper> :
                            <>
                                {renderButtonMeno(data)}
                            </>
                        }
                    </Fragment>
                );
            })}
        </menu>
    )
}

export default Menu