import { ChangeEvent, useState } from 'react';
import { TextField } from '@shatel/ui-kit';
import Filters from './Filters';

interface AccessFiltersProps {
    filterOptions: { label: string; value: string }[];
    onFilterChange: (filter: string) => void;
    onSearchChange: (search: string) => void;
    searchValue: string;
    defaultLabel?: string;
}

const AccessFilters = ({ filterOptions, onFilterChange, onSearchChange, searchValue, defaultLabel = "جستجو" }: AccessFiltersProps) => {
    const [filter, setFilter] = useState('All');

    const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFilter(value);
        onFilterChange(value);
    };

    return (
        <div className="flex gap-large">
            <Filters
                filterPage={filter}
                defaultLabel={defaultLabel}
                options={filterOptions}
                onChangeDropDown={handleFilterChange}
                onChangeSearch={(e) => onSearchChange(e.target.value)}
            />
            <TextField
                label="جستجو بر اساس نام دسترسی"
                value={searchValue}
                className="bg-main-white"
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
};

export default AccessFilters;
