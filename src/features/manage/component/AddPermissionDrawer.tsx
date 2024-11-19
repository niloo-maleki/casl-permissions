import { Drawer, Checkbox, TextField, Button, Paragraph, showToast } from '@shatel/ui-kit';
import { postResource } from '@src/api/endpoints/resourcesApi';
import { updateJson } from '@src/api/endpoints/updateJsonApi';
import DropDown from '@src/components/shared/DropDown';
import { capitalizeFirstLetter } from '@src/helper/helper';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface AddPermissionDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    pageName: string[];
}

const AddPermissionDrawer = ({ open, setOpen, pageName }: AddPermissionDrawerProps) => {
    const [isPage, setIsPage] = useState(false);
    const [permissionName, setPermissionName] = useState('');
    const [selectPage, setSelectPage] = useState('Public');
    const [description, setDescription] = useState('');
    const queryClient = useQueryClient();
    const { t } = useTranslation()
    
    const resetForm = () => {
        setPermissionName('');
        setDescription('');
        setSelectPage('Public');
        setIsPage(false);
        setOpen(false);
    };

    useEffect(() => {
        if (isPage) {
            setSelectPage(capitalizeFirstLetter(permissionName));
        }
        return
    }, [isPage, permissionName])


    const handleSave = async () => {
        try {
            await postResource({
                description,
                name: isPage ? `page-${permissionName}` : permissionName,
                page: { name: selectPage },
            });

            queryClient.invalidateQueries({ queryKey: ['allResources'] });
            showToast('success', 'ثبت دسترسی با موفقیت انجام شد');

            resetForm();

            if (process.env.NODE_ENV === "development") {
                await updateJson(); // Call to update the JSON file
            }

        } catch (error) {
            console.error(error)
        }
    };

    const radioButtonData = pageName.map(item => ({
        label: item,
        value: item,
    }));


    const handlePermissionChange = (e: ChangeEvent<HTMLInputElement>) => {
        const permissionName = e.target.value.replace(/^page-/, '');
        setPermissionName(permissionName);
    };


    return (
        <Drawer anchor="left" onClose={() => setOpen(false)} title="افزودن دسترسی" open={open}>
            <div className="flex flex-col gap-large">
                <Checkbox
                    checked={isPage}
                    label={<Paragraph variant="p1">{t("manager.page-accessible")}</Paragraph>}
                    onChange={() => setIsPage(!isPage)}
                />
                <TextField
                    label="Permission Name"
                    className="bg-main-white"
                    value={isPage ? `page-${permissionName}` : permissionName}
                    onChange={handlePermissionChange}
                />
                <TextField
                    label="Description"
                    className="bg-main-white"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <DropDown
                    disabled={isPage}
                    data={selectPage}
                    searchBox
                    radioButtonData={radioButtonData}
                    onChange={(e) => setSelectPage(e.target.value)}
                />
                <Button onClick={handleSave}>ذخیره</Button>
            </div>
        </Drawer>
    );
};

export default AddPermissionDrawer;
