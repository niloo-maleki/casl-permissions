import { cn, Paragraph, IconExpandDownLight, TextField, RadioButton } from "@shatel/ui-kit";
import { useClickOutside } from "@src/hooks/useClickOutSide";
import { ChangeEventHandler, useState } from "react";
import PermissionWrapper from "./PermissionWrapper";
import { getPermissionKey } from "@src/helper/helper";
import { PagePermissionKey, PermissionKey } from "@src/api/interface";
import { usePermissions } from "@src/hooks/usePermissions";

export interface RadioButtonData {
    label: string;
    value: string;
    permission?: {
        page: PagePermissionKey;
        key: PermissionKey;
    };
}
export interface DropDownProps {
    radioButtonData: RadioButtonData[];
    defaultLabel?: string;
    searchBox?: boolean;
    className?: string;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    checked?: boolean;
    data?: string;
    disabled?: boolean;
}

const DropDown = (props: DropDownProps) => {
    const { radioButtonData, defaultLabel, searchBox = false, data, className = '', onChange, disabled = false } = props;
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const { Resources } = usePermissions();

    const label = defaultLabel ? defaultLabel : data;
    const ref = useClickOutside(() => {
        setOpen(false);
    });

    const handleClick = () => {
        setOpen(!open);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const filteredData = search
        ? radioButtonData.filter((item) =>
            item.label.toLowerCase().includes(search.toLowerCase())
        )
        : radioButtonData;

    const renderRadioButton = ({ value, label }: RadioButtonData) => {
        return (
            <RadioButton
                id={value}
                name={value}
                checked={data === value}
                value={value}
                onChange={onChange}
                label={
                    <Paragraph className="hover:text-cta-hover-primary" variant="p">
                        {label}
                    </Paragraph>
                }
            />
        );
    };

    return (
        <div ref={ref} className="flex flex-col relative">
            <button
                disabled={disabled}
                onClick={handleClick}
                className={cn(
                    "h-12 bg-main-white rounded-medium px-large text-center flex gap-small justify-between items-center",
                    "focus:border-1 focus:outline-none focus:border-primary",
                    "disabled:bg-primary",
                    className
                )}
                type="button"
            >
                <Paragraph variant="p1">{label}</Paragraph>
                <IconExpandDownLight
                    className={cn("fill-main-white stroke-main-primary stroke-2", disabled && "fill-none")}
                />
            </button>

            {open && (
                <div className={cn("z-10 absolute top-14 bg-main-white rounded-medium shadow w-full", className)}>
                    {searchBox && (
                        <div className="p-small">
                            <TextField
                                label="جستجو"
                                className="bg-main-white"
                                onChange={handleSearchChange}
                                value={search}
                            />
                        </div>
                    )}

                    <ul className="max-h-48 p-small overflow-y-auto text-sm">
                        {filteredData.length > 0 ? (
                            filteredData.map(({ label, value, permission }) => (
                                <div key={value} className="flex items-center p-xsmall">
                                    {permission ? (
                                        <PermissionWrapper permissionKey={getPermissionKey(Resources, permission)}>
                                            {renderRadioButton({ label, value })}
                                        </PermissionWrapper>
                                    ) : (
                                        renderRadioButton({ label, value })
                                    )}
                                </div>
                            ))
                        ) : (
                            <Paragraph variant="p2" className="p-xsmall text-gray-500">هیچ گزینه‌ای یافت نشد</Paragraph>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDown;
