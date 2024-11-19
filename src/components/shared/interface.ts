import { ReactNode } from "react";

export type Columns = {
    field: string;
    headerName: string;
    headerClassName?: string;
};

export interface CellObject {
    value: string | number;
    icon?: JSX.Element;
}

export type CellData = CellObject[] | ReactNode | ((params: Record<string, unknown>) => ReactNode);

export type RowData = Record<string, CellData>;

export interface TableProps {
    columns: Columns[];
    rowData: RowData[];
    itemsPerPage?: number;
    maxPageNumbers?: number;
    children?: ReactNode;
}
