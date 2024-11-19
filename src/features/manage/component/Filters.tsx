import DropDown from '@src/components/shared/DropDown';
import { ChangeEventHandler } from 'react';

interface OptionType {
    label: string;
    value: string;
}

interface FiltersProps {
    filterPage: string;
    onChangeDropDown: ChangeEventHandler<HTMLInputElement>;
    onChangeSearch: ChangeEventHandler<HTMLInputElement>;
    options: OptionType[]; 
    defaultLabel?: string;
}

const Filters = (props: FiltersProps) => {
    const { filterPage, onChangeDropDown, options, defaultLabel } = props;

    const radioButtonData = [
        { label: 'All', value: 'All' },
        ...options,
    ];

    return (
            <DropDown
                searchBox
                defaultLabel={defaultLabel}
                data={filterPage}
                radioButtonData={radioButtonData}
                onChange={onChangeDropDown}
                className='w-fit'
            />
    );
};

export default Filters;
