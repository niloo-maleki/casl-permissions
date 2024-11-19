import { Button, Checkbox, Drawer, Loading, Paragraph, showToast, TextField } from "@shatel/ui-kit";
import { getAllRoles, postModifyRoleResources, postRole } from "@src/api/api";
import { IGetRole, IResourceAccess } from "@src/api/interface";
import DropDown from "@src/components/shared/DropDown";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";


interface IAccessAllocation {
  resourceAccess: IResourceAccess[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AccessAllocationDrawer = (props: IAccessAllocation) => {
  const { resourceAccess, open, setOpen } = props
  const [selectRole, setSelectRole] = useState('');
  const [isNewRole, setIsNewRole] = useState(false);
  const queryClient = useQueryClient();

  const { t } = useTranslation()

  const { data: getRoles, isLoading } = useQuery({
    queryKey: ['allRoles'],
    queryFn: getAllRoles,
  });

  const resetForm = () => {
    setIsNewRole(false);
    setSelectRole('')
  }

  if (!resourceAccess) {
    return
  }

  if (isLoading || !getRoles?.data) {
    return <Loading />
  }

  const handleSave = async () => {
    if (!selectRole || !resourceAccess) {
      showToast('error', "لطفاً نقش و داده‌های دسترسی را انتخاب کنید.", {}, 'test');
      return;
    }

    try {
      if (isNewRole) {
        await postRole({
          roleName: selectRole
        });
        console.log("نقش جدید با موفقیت ایجاد شد.");
      }

      await postModifyRoleResources({
        resourceAccess: resourceAccess,
        roleName: selectRole

      });

      queryClient.invalidateQueries({ queryKey: ['allRoles'] });

      showToast('success', "عملیات ذخیره‌سازی با موفقیت انجام شد!", {}, 'test');

    } catch (error) {
      console.error("خطایی رخ داد در حین ذخیره‌سازی:", error);
      showToast('error', "متأسفانه خطایی در حین ذخیره‌سازی رخ داده است.");

    } finally {
      closeDrawerHandler()
    }
  };

  const radioButtonData = Object.values(getRoles.data).map(({ roleName }: IGetRole) => ({
    label: roleName,
    value: roleName,
  }));

  const closeDrawerHandler = (() => {
    setOpen(false)
    resetForm()
  })

  return (
    <Drawer anchor="left" onClose={closeDrawerHandler} title="افزودن دسترسی به نقش" open={open}>
      <div className="flex flex-col gap-large">
        <Checkbox
          checked={isNewRole}
          label={<Paragraph variant="p1">{t("manager.role-accessible")}</Paragraph>}
          onChange={() => setIsNewRole(!isNewRole)}
        />
        {isNewRole &&
          <TextField
            label="افزودن نقش جدید"
            className="bg-main-white"
            value={selectRole}
            onChange={(e) => setSelectRole(e.target.value)}
          />
        }

        {!isNewRole &&
          <DropDown
            disabled={isNewRole}
            data={selectRole}
            searchBox
            defaultLabel={t("manager.select-role")}
            radioButtonData={radioButtonData}
            onChange={(e) => setSelectRole(e.target.value)}
          />
        }
        <Button onClick={handleSave}>{t("manager.save")}</Button>
      </div>
    </Drawer>
  )
}

export default AccessAllocationDrawer