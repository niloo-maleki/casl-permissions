import { Paragraph } from "@shatel/ui-kit";
import { useState, ReactNode } from "react";
import { TableProps, CellData, CellObject } from "./interface";
import Pagination from "./Pagination";

const Card = (props: TableProps) => {
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
                        <Paragraph variant="p2">{value}</Paragraph>
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

        return <div className="flex items-center justify-center h-full">
            <Paragraph variant="p2">{data}</Paragraph>
        </div>
    };

    return (
        <div className="flex flex-col gap-small p-small overflow-auto w-full">
            {currentItems.map((item, rowIndex) => (
                <button key={rowIndex} className={`flex bg-main-white hover:bg-hover-primary rounded-medium py-small px-medium justify-between border-1 border-primary items-center`}>
                    {columns.map((col, colIndex) => (
                        <div key={colIndex} className="flex flex-col items-start gap-xsmall h-full ">
                            <div className="flex items-center w-full">
                                <Paragraph className="text-subtext1" variant="p2"> {col.headerName}</Paragraph>
                            </div>
                            {renderCellContent(item[col.field])}
                        </div>

                    ))}
                </button>
            ))}

            <Pagination
                totalItems={rowData.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageClick}
                activeClassName={"bg-main-primary-10 text-action-warning rounded-full"}
                maxPageNumbers={maxPageNumbers}
            />
        </div>)
}

export default Card