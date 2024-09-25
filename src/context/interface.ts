import { MongoAbility } from "@casl/ability";
import { Permission } from "@src/api/interface";

export interface AuthProviderProps {
    children: React.ReactNode;
    initialRole: string | null
}

export type Actions = "manage" | "View" | "edit" | "create" | "delete";

export type AppAbility = MongoAbility<[Actions, string]>;

export interface AuthContextProps {
    role: string | null;
    setRole: (role: string) => void;
    permissions: Permission[];
    setPermissions: (permissions: Permission[]) => void;
    actionsByItem: { [item: string]: Actions[] };
}