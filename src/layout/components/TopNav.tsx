import { Logo, IconSettingLineLight, cn, Title } from '@shatel/ui-kit'
import avatar from '@icons/3d_avatar_7.svg'
import { useState } from 'react';

interface ITopNavProps {
    title?: string
}

const TopNav = ({ title }: ITopNavProps) => {
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(!loading);
    };
    return (
        <header className='flex bg-cta-focus-primary h-16 items-center justify-between border-primary px-large py-small border-b-1'>
            <div className='flex items-center gap-medium'>
                <div className={cn('w-11 h-11 rounded-full bg-main-primary-10 center cursor-pointer')}>
                    <img
                        src={avatar}
                        alt='avatar'
                        className={cn('w-full object-cover')}
                    />
                </div>
                <Title variant='h6'>{title}</Title>
                <IconSettingLineLight className={cn('stroke-black')} onClick={handleLogin} />
            </div>
            <Logo className='size-12' />
        </header>
    )
}

export default TopNav