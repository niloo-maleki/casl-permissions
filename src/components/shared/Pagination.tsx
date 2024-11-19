import { cn, IconExpandLeftLight, IconExpandRightLight } from "@shatel/ui-kit";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    previousLabel?: React.ReactNode;
    nextLabel?: React.ReactNode;
    activeClassName?: string;
    maxPageNumbers?: number;
}

const Pagination = (props: PaginationProps) => {
    const { currentPage, itemsPerPage, onPageChange, totalItems, activeClassName, previousLabel, nextLabel } = props;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={cn('px-medium py-xsmall',
                        currentPage === i ? activeClassName : '')}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };


    return (
        <div className="flex justify-center items-center gap-auto py-medium">


            {previousLabel ? previousLabel : <IconExpandRightLight
                onClick={() => handlePageClick(currentPage - 1)}
                className={cn("fill-main-white stroke-main-primary stroke-2 cursor-pointer",
                    currentPage === 0 && 'stroke-inactive-text'
                )} />}


            {renderPageNumbers()}


            {nextLabel ? nextLabel : <IconExpandLeftLight
                onClick={() => handlePageClick(currentPage + 1)}
                className={cn("fill-main-white stroke-main-primary stroke-2 cursor-pointer",
                    currentPage === totalPages && 'stroke-inactive-text'
                )} />}

        </div>
    )
}

export default Pagination