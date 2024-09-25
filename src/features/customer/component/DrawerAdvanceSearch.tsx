import { Divider, Paragraph, Switch } from '@shatel/ui-kit'
import { city, customerStatus } from '@src/components/mockData.ts/mockCheckBoxData'
import DropDown from '@src/components/shared/DropDown'
import { useState } from 'react'

const DrawerAdvanceSearch = () => {
    const [checkedMyUser, setCheckedMyUser] = useState(false)
    const [checkedSpecialUser, setCheckedSpecialUser] = useState(false)

    return (
        <div className='flex flex-col gap-medium'>
            <div className='flex flex-col gap-small bg-cta-secondary rounded-medium  p-medium '>
                <Switch
                    className="w-full"
                    checked={checkedMyUser}
                    label={<Paragraph variant="p1">مشترکین من</Paragraph>}
                    onChange={() => setCheckedMyUser(!checkedMyUser)}
                />
                <Switch
                    className="w-full"
                    checked={checkedSpecialUser}
                    label={<Paragraph variant="p1">مشترکین ویژه</Paragraph>}
                    onChange={() => setCheckedSpecialUser(!checkedSpecialUser)}
                />

            </div>
            <Divider />
            <div className='flex flex-col gap-small bg-cta-secondary rounded-medium  p-medium '>
                <DropDown radioButtonData={city} deafaultLabel="شهر" />
                <DropDown radioButtonData={customerStatus} deafaultLabel="شرکت" />
                <DropDown radioButtonData={customerStatus} deafaultLabel="نوع مرکز" />
                <DropDown radioButtonData={customerStatus} deafaultLabel="مرکز ارایه سرویس" />
            </div>
            <Divider />

        </div>
    )
}

export default DrawerAdvanceSearch