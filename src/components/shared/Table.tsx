import { cn, Paragraph } from "@shatel/ui-kit";
import { ReactNode, useState } from "react";
import Pagination from "./Pagination";
import { CellData, CellObject, TableProps } from "./interface";



const Table = (props: TableProps) => {
    const { columns, rowData, itemsPerPage = 10, maxPageNumbers } = props;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    const offset = (currentPage - 1) * itemsPerPage;
    const currentItems = rowData.slice(offset, offset + itemsPerPage);

    const renderCellContent = (data: CellData): ReactNode => {

        const renderArrayItems = (items: CellObject[]) => (
            <div className="flex flex-col gap-small">
                {items.map(({ value, icon }, index) => (
                    <div key={index} className="flex gap-small items-center">
                        {icon && icon}
                        <span>{value}</span>
                    </div>
                ))}
            </div>
        );

        if (typeof data === 'function') {
            return data({});
        }

        if (Array.isArray(data)) {
            return renderArrayItems(data)
        }

        return <span>{data}</span>;
    };

    return (
        <div className="flex flex-col relative bg-main-white overflow-auto shadow-md rounded-small w-full">
            <table className={cn("w-full text-sm text-right")}>
                <thead className=" text-heading h-fit">
                    <tr className={`grid grid-cols-${columns.length} gap-medium bg-cta-hover-secondary`}>
                        {columns.map((column, index) => (
                            <th key={index} className={` p-medium ${column.headerClassName || ''}`}>
                                <Paragraph variant="p2"> {column.headerName}
                                </Paragraph>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {currentItems.map((item, rowIndex) => (
                        <tr key={rowIndex} className={`grid grid-cols-${columns.length} gap-medium border-b-1 border-primary items-center`}>
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="grid p-small">
                                    {renderCellContent(item[col.field])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                totalItems={rowData.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageClick}
                activeClassName={"bg-main-primary-10 text-action-warning rounded-full"}
                maxPageNumbers={maxPageNumbers}
            />
        </div>
    );
};

export default Table;
