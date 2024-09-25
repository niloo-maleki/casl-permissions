import { Divider, Title } from "@shatel/ui-kit";
import { columnsData, rowDatas } from "@src/components/mockData.ts/mockGridData";
import Table from "@src/components/shared/Table";
import SearchUser from "./component/SearchUser";



const CustomerPage = () => {

  return (


    <div className='flex flex-col gap-large w-full h-full'>
      <div className="flex w-full justify-between">
        <Title variant="h4">فهرست مشترکین</Title>
      </div>
      <Divider />

      <SearchUser />

      <Table columns={columnsData} rowData={rowDatas} itemsPerPage={4}/>
    </div>
  );
};

export default CustomerPage;
