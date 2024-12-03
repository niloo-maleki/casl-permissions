import { Button, cn, Drawer, Paragraph, TextField } from "@shatel/ui-kit"
import { useTranslation } from "react-i18next"

interface SearchDrawerProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const SearchDrawer = (props: SearchDrawerProps) => {
    const { open, setOpen } = props
    const { t } = useTranslation()


    const handlerSearch = () => {
        console.log('salamm')
        setOpen(false)

    }

    return (
        <Drawer
            anchor="left"
            onClose={() => setOpen(false)}
            title={t("customer.advancedSearch")}
            open={open}
        >
            <div className='flex flex-col gap-medium'>
                <div className='flex flex-col gap-small bg-cta-secondary rounded-medium  p-medium '>
                    <TextField
                        label={t("customer.customer-name")}
                        className='bg-main-white'
                    ></TextField>
                    <TextField
                        label={t("customer.subscription-code")}
                        className='bg-main-white'
                    ></TextField>
                    <TextField
                        label={t("customer.customer-id")}
                        className='bg-main-white'
                    ></TextField>   <TextField
                        label={t("customer.phoneNumber")}
                        className='bg-main-white'
                    ></TextField>   <TextField
                        label={t("customer.national-code")}
                        className='bg-main-white'
                    ></TextField>
                    <TextField
                        label={t("customer.postal-code")}
                        className='bg-main-white'
                    ></TextField>
                </div>

                <Button
                    variant="primary"
                    className={cn("rounded-small bg-main-brand-primary")}
                    placement='end'
                    onClick={handlerSearch}
                >
                    <Paragraph variant="p">
                        {t("customer.search")}
                    </Paragraph>
                </Button>
            </div>
        </Drawer>
    )
}

export default SearchDrawer