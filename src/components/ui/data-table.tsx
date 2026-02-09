import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./data-table-pagination"
import { Input } from "@/components/ui/input"
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Column<T> {
    header: string
    accessorKey: keyof T
    cell?: (item: T) => React.ReactNode
    className?: string
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data?: T[]
    fetchData?: (params: {
        page: number
        pageSize: number
        search: string
        sort?: { column: keyof T; direction: 'asc' | 'desc' }
    }) => Promise<{ data: T[]; total: number; totalPages: number }>
    initialPageSize?: number
    actions?: React.ReactNode
    searchKeys?: (keyof T | string)[]
}

// Helper to access nested properties safely
function getNestedValue(obj: any, path: string | keyof any): any {
    if (typeof path !== 'string') return obj[path];
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function DataTable<T extends { id: string | number }>({
    columns,
    data: initialData,
    fetchData,
    initialPageSize = 10,
    actions,
    searchKeys,
}: DataTableProps<T>) {
    const [data, setData] = React.useState<T[]>([])
    const [loading, setLoading] = React.useState(true)
    const [page, setPage] = React.useState(1)
    const [pageSize] = React.useState(initialPageSize)
    const [total, setTotal] = React.useState(0)
    const [totalPages, setTotalPages] = React.useState(0)
    const [search, setSearch] = React.useState("")
    const [sort, setSort] = React.useState<{ column: keyof T; direction: 'asc' | 'desc' } | undefined>()

    // Debounce search
    const [debouncedSearch, setDebouncedSearch] = React.useState("")
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search)
            setPage(1) // Reset to page 1 on search change
        }, 500)
        return () => clearTimeout(timer)
    }, [search])

    const loadData = React.useCallback(async () => {
        setLoading(true)
        
        // Check if we have client-side data provided
        if (initialData) {
            try {
                let filtered = [...initialData];

                // Global Search
                if (debouncedSearch && searchKeys && searchKeys.length > 0) {
                    const searchLower = debouncedSearch.toLowerCase();
                    filtered = filtered.filter(item => {
                        return searchKeys.some(key => {
                            const value = getNestedValue(item, key);
                            return String(value).toLowerCase().includes(searchLower);
                        });
                    });
                }

                // Sorting
                if (sort) {
                    filtered.sort((a, b) => {
                        const aVal = getNestedValue(a, sort.column);
                        const bVal = getNestedValue(b, sort.column);
                        
                        if (aVal === bVal) return 0;
                        
                        const comparison = aVal < bVal ? -1 : 1;
                        return sort.direction === 'asc' ? comparison : -comparison;
                    });
                }

                // Pagination
                const totalItems = filtered.length;
                const calculatedTotalPages = Math.ceil(totalItems / pageSize);
                const startIndex = (page - 1) * pageSize;
                const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

                setData(paginatedData);
                setTotal(totalItems);
                setTotalPages(calculatedTotalPages);
            } catch (error) {
                console.error("Error processing client-side data:", error);
            } finally {
                setLoading(false);
            }
            return;
        }

        // Server-side fetching
        if (fetchData) {
            try {
                const result = await fetchData({
                    page,
                    pageSize,
                    search: debouncedSearch,
                    sort,
                })
                setData(result.data)
                setTotal(result.total)
                setTotalPages(result.totalPages)
            } catch (error) {
                console.error("Failed to fetch data:", error)
            } finally {
                setLoading(false)
            }
        }
    }, [fetchData, initialData, page, pageSize, debouncedSearch, sort, searchKeys])

    React.useEffect(() => {
        loadData()
    }, [loadData])

    const handleSort = (columnKey: keyof T) => {
        setSort(prev => {
            if (prev?.column === columnKey) {
                return prev.direction === 'asc'
                    ? { column: columnKey, direction: 'desc' }
                    : undefined
            }
            return { column: columnKey, direction: 'asc' }
        })
    }

    const renderSortIcon = (columnKey: keyof T) => {
        if (sort?.column !== columnKey) return <ChevronsUpDown className="ml-2 h-4 w-4" />
        return sort.direction === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <div className="relative max-w-sm flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                {actions}
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead 
                                    key={String(column.accessorKey)} 
                                    className={cn("cursor-pointer select-none", column.className)}
                                    onClick={() => handleSort(column.accessorKey)}
                                >
                                    <div className="flex items-center">
                                        {column.header}
                                        {renderSortIcon(column.accessorKey)}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                             <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={item.id}>
                                    {columns.map((column) => (
                                        <TableCell key={String(column.accessorKey)} className={column.className}>
                                            {column.cell ? column.cell(item) : (item[column.accessorKey] as React.ReactNode)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing {data.length} of {total} results
                </div>
                {totalPages > 1 && (
                    <DataTablePagination 
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}
            </div>
        </div>
    )
}
