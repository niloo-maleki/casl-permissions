import { Button, Checkbox, Loading, Modal, Paragraph } from '@shatel/ui-kit'
import { getAllUsers, postModifyRoleUsers } from '@src/api/api'
import { IUser, IUserAccess } from '@src/api/interface'
import { columnsRoleUsersData } from '@src/components/mockData.ts/mockGridData'
import Table from '@src/components/shared/Table'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useState } from 'react'
import Filters from './Filters'

interface IRoleUsersModal {
  roleName: string,
  setOpenModal: (a: boolean) => void,
  open: boolean,
  users: IUserAccess[]
  setSelectedUsers: Dispatch<SetStateAction<IUserAccess[]>>; 

}
const RoleUsersModal = (props: IRoleUsersModal) => {
  const { roleName, open, setOpenModal, users, setSelectedUsers } = props
  const [filter, setFilter] = useState('All');
  const [userFilter, setUsersFilter] = useState('');
  const [UpdateUsers, setUpdateUsers] = useState<IUserAccess[]>([]);

  const { data: allUsers, isLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: getAllUsers
  })

  if (isLoading || !allUsers?.data) {
    return <Loading />;
  }

  const onCheckboxChange = ((item: IUser, isChecked: boolean) => {
    setSelectedUsers((prevSelected) =>
      isChecked
        ? [...prevSelected, { userName: item.userName, hasAccess: isChecked }]
        : prevSelected.filter((perm) => perm.userName !== item.userName)
    );
    setUpdateUsers([...UpdateUsers, { userName: item.userName, hasAccess: isChecked }])
  })

  const submitChanges = async () => {
    await postModifyRoleUsers({
      roleName: roleName,
      userAccess: UpdateUsers
    });
    setUpdateUsers([])
    setOpenModal(false)
  };

  const usersRowData = Object.values(allUsers.data).map(({ id, userName }: IUser) => ({
    select: (
      <Checkbox
        label={<Paragraph variant="p1">{userName}</Paragraph>}
        key={userName}
        name={userName}
        checked={users.some((perm) => perm.userName === userName && perm.hasAccess === true)}
        onChange={(e) =>
          onCheckboxChange({ id, userName }, e.target.checked)}
      />
    ),
  }));

  const filteredRowData = usersRowData.filter((item) =>
    (filter === 'All' || item.select.key?.toLowerCase().includes(filter.toLowerCase())) &&
    item.select.key?.toLowerCase().includes(userFilter.toLowerCase())
  );

  return (
    <>
      <Modal
        className="gap-large"
        title={`دسترسی‌های نقش ${roleName}`}
        open={open}
        onClose={() => setOpenModal(false)}
      >
        <Filters
          filterPage={filter}
          defaultLabel="جستجو"
          options={Object.values(allUsers.data).map((role) => ({
            label: role.userName,
            value: role.userName,
          }))}
          onChangeDropDown={(e) => setFilter(e.target.value)}
          onChangeSearch={(e) => setUsersFilter(e.target.value)}
        />

        <Table columns={columnsRoleUsersData} rowData={filteredRowData} itemsPerPage={5} />

        <Button
          placement="end"
          className="w-1/7 rounded-small"
          onClick={submitChanges}
        >
          ثبت تغییرات
        </Button>
      </Modal></>
  )
}

export default RoleUsersModal