import { cn, Paragraph, IconExpandDownLight, TextField, RadioButton } from "@shatel/ui-kit"
import { useClickOutside } from "@src/hooks/useClickOutSide";
import { useState } from "react"
import PermissionWrapper from "./PermissionWrapper";



interface RadioButtonData {
    label: string;
    value: string;
    permission?: number;
}
interface DropDownProps {
    radioButtonData: RadioButtonData[];
    deafaultLabel: string;
    deafaultChecked?: string;
    searchBox?: boolean;
    className?: string;
}

const DropDown = (props: DropDownProps) => {
    const { radioButtonData, deafaultLabel, deafaultChecked, searchBox = false, className = '' } = props
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(deafaultChecked);

    const ref = useClickOutside(() => {
        setOpen(false)
    });


    const handleClick = () => {
        setOpen(!open)
    }
    const renderRadioButton = (({ value, label }: RadioButtonData) => {

        return(
            <RadioButton id={value} name={value} checked={data === value} value={value} onChange={e => setData(e.target.value)}
                label={
                    <Paragraph className="hover:text-cta-hover-primary" variant='p'>{label}</Paragraph>
                } />
        )
    })

    return (
        <div ref={ref} className="flex flex-col relative">
            <button onClick={handleClick} className={cn("h-12 bg-main-white rounded-medium px-large text-center flex justify-between items-center",
                "focus:border-1 focus:outline-none focus:border-primary", className
            )} type="button">
                <Paragraph variant="p1">{deafaultLabel}</Paragraph>

                <IconExpandDownLight className={cn("fill-main-white stroke-main-primary stroke-2")} />
            </button>

            {open && <div className={cn("z-10 absolute top-14 bg-main-white rounded-medium shadow w-full", className)}>
                {searchBox &&
                    <div className="p-small">
                        <TextField
                            label='جستجو' className='bg-main-white'

                        >
                        </TextField>
                    </div>
                }

                <ul className="max-h-48 p-small overflow-y-auto text-sm">
                    <li>
                        {radioButtonData.map(({ label, value,permission }) => {
                            return (

                                <div key={value} className="flex items-center p-xsmall">
                                    {permission ?
                                        <PermissionWrapper
                                            permissionId={permission}
                                        >
                                            {renderRadioButton({ label, value })}
                                        </PermissionWrapper> :
                                        <>
                                            {renderRadioButton({ label, value })}
                                        </>
                                    }
                                </div>

                            )
                        })}
                    </li>
                </ul>
            </div>}

        </div>
    )
}

export default DropDown