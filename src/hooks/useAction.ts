import { useEffect, useState } from "react";
import { Permission } from "../api/api";
import { Actions } from "@src/context/AuthContext";

export function useAction(permissions: Permission[]) {
  const [actionsByItem, setActionsByItem] = useState<{ [item: string]: Actions[] }>({});

  useEffect(() => {
    if (permissions) {
      const actionsMap: { [item: string]: Actions[] } = {};

      permissions.forEach((permission) => {
        const { action, resourceId } = permission;

        if (!actionsMap[resourceId]) {
          actionsMap[resourceId] = Array.isArray(action) ? action : [action];
        } else {

          actionsMap[resourceId].push(...(Array.isArray(action) ? action : [action]));
        }
      });

      setActionsByItem(actionsMap);
    }
  }, [permissions]);

  return {
    actionsByItem,
  };
}
