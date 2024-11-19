import {
    Divider,
    Title,
    Button,
    Drawer,
    TextField,
    Paragraph,
    cn,
    IconAddSquareLight,
} from '@shatel/ui-kit';
import Table from '@src/components/shared/Table';
import { columnsTranslationData } from '@src/components/mockData.ts/mockGridData';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TranslationPanel = () => {
    const { t, i18n } = useTranslation(); 
    const [editKey, setEditKey] = useState<string>('');
    const [editValue, setEditValue] = useState<string>('');
    const [openSearch, setOpenSearch] = useState(false);
    const [openAddNewKey, setOpenAddNewKey] = useState(false);

    const translations = i18n.store.data[i18n.language]; 

    const rowData = Object.keys(translations).map((key) => ({
        key,
        faTranslate: t(key), 
        action: (
            <Button
                placement="start"
                className={cn('w-2/5 rounded-small')}
                onClick={() => handleEdit(key)}
            >
                {t('edit')} 
            </Button>
        ),
    }));

    const handleEdit = (key: string) => {
        setOpenSearch(true);
        setEditKey(key);
        setEditValue(t(key));
    };

    const handleSave = async () => {
        if (editKey) {
            await i18n.addResourceBundle(i18n.language, 'translation', { [editKey]: editValue }, true, true);
            setEditValue('');
        }
        setOpenSearch(false);
        setOpenAddNewKey(false);
    };

    return (
        <div className="flex flex-col gap-xsmall w-full">
            <div className="flex w-full justify-between">
                <Title variant="h4">{t("translations.title", "ترجمه ها")}</Title>
                <button
                    onClick={() => setOpenAddNewKey(true)}
                    className='cursor-pointer flex gap-small items-center'
                >
                    <Paragraph variant="p">{t("translations.add_new", "ترجمه جدید")}</Paragraph>
                    <IconAddSquareLight className='cursor-pointer fill-main-white stroke-main-brand-secondary hover:fill-marketing-orange stroke-2' />
                </button>
            </div>
            <Divider />

            <Table columns={columnsTranslationData} rowData={rowData} itemsPerPage={10} />

            <Drawer
                anchor="left"
                onClose={() => setOpenSearch(false)}
                title={t("translations.edit_title", "ویرایش ترجمه")}
                open={openSearch}
            >
                <div className="flex flex-col gap-large">
                    <Paragraph variant="p">{t("translations.key", "کلید")}: {editKey}</Paragraph>
                    <TextField
                        label={editKey}
                        className="bg-main-white"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                    />
                    <Button onClick={handleSave}>{t("translations.save", "ذخیره")}</Button>
                </div>
            </Drawer>

            <Drawer
                anchor="left"
                onClose={() => setOpenAddNewKey(false)}
                title={t("translations.add_title", "افزودن ترجمه")}
                open={openAddNewKey}
            >
                <div className="flex flex-col gap-large">
                    <TextField
                        label={t("translations.key_label", "کلید ترجمه")}
                        className="bg-main-white"
                        onChange={(e) => setEditKey(e.target.value)}
                    />
                    <TextField
                        label={t("translations.value_label", "مقدار ترجمه")}
                        className="bg-main-white"
                        onChange={(e) => setEditValue(e.target.value)}
                    />
                    <Button onClick={handleSave}>{t("translations.save", "ذخیره")}</Button>
                </div>
            </Drawer>
        </div>
    );
};

export default TranslationPanel;
