
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaginationProps) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="p-4 bg-app-bg/50 border-t border-app-border flex items-center justify-between">
            <span className="text-xs font-semibold text-app-muted uppercase tracking-wider">
                Showing {startItem} to {endItem} of {totalItems} orders
            </span>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="size-8 flex items-center justify-center rounded border border-app-border bg-white text-app-muted hover:text-app-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-[18px] h-[18px]" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`size-8 flex items-center justify-center rounded border transition-colors ${
                            currentPage === page
                                ? "border-app-text bg-app-text text-white font-bold text-xs"
                                : "border-app-border bg-white text-app-muted hover:text-app-text font-bold text-xs"
                        }`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="size-8 flex items-center justify-center rounded border border-app-border bg-white text-app-muted hover:text-app-text disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight className="w-[18px] h-[18px]" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
