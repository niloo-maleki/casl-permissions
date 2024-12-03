import { cn, Divider, IconAddRoundLight, Paragraph, Title } from "@shatel/ui-kit";
import { columnsData, rowDatas } from "@src/components/mockData.ts/mockGridData";
import UsersGrid from "./component/UsersGrid";
import { useTranslation } from "react-i18next";
import Card from "@src/components/shared/Card";


const CustomerPage = () => {
  const { t } = useTranslation()

  const addUser =(()=>{
    alert("add nesw user page")
  })
  return (
    <div className='flex flex-col gap-small w-full h-full'>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-medium">
          <Title variant="h4">{t("users-list")}</Title>
          <button className={cn('flex items-center border-1 rounded-small border-typography-heading p-xsmall',
            'hover:bg-hover-primary'
          )}
            onClick={addUser}
          >
            <Paragraph variant="p1">
              ثبت سفارش
            </Paragraph>

            <IconAddRoundLight className="stroke-main-brand-primary stroke-2" />
          </button>
        </div>

        <UsersGrid />
      </div>

      <Divider />

      <Card columns={columnsData} rowData={rowDatas} itemsPerPage={5} />
    </div>
  );
};

export default CustomerPage;
