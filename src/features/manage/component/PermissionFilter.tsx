import { cn, TextField } from '@shatel/ui-kit'
import Filters from './Filters'
import { PermissionGroups } from '@src/api/interface';
import { ChangeEventHandler } from 'react';

interface IPermissionFilter {
    permissionFilter: string;
    pageName: PermissionGroups;
    onChangeDropDown: ChangeEventHandler<HTMLInputElement>;
    onChange: ChangeEventHandler<HTMLInputElement>;
    filter: string;
    className?:string

}
const PermissionFilter = (props: IPermissionFilter) => {
    const { permissionFilter, pageName, onChangeDropDown, onChange, filter, className } = props

    const filterOptions = Object.keys(pageName).map((item) => ({
        label: item,
        value: item,
    }));

    return (
        <div className={cn('flex gap-medium', className)}>
            <Filters
                filterPage={filter}
                defaultLabel="جستجو بر اساس نام صفحه"
                options={filterOptions}
                onChangeDropDown={onChangeDropDown}
                onChangeSearch={onChange}
            />
            <TextField
                label="جستجو بر اساس نام دسترسی"
                value={permissionFilter}
                className='bg-main-white'
                onChange={onChange}
            />
        </div>
    )
}

export default PermissionFilter