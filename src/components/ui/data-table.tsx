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
import { cn, debounce } from "@/lib/utils"

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
    onRowClick?: (item: T) => void
    refreshTrigger?: any // Still useful for manual re-fetch if needed
    
    // Controlled props
    loading?: boolean
    total?: number
    totalPages?: number
    page?: number
    onPageChange?: (page: number) => void
    search?: string
    onSearchChange?: (query: string) => void
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc' | undefined) => void
    hideSearch?: boolean
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
    onRowClick,
    refreshTrigger,
    loading: propsLoading,
    total: propsTotal,
    totalPages: propsTotalPages,
    page: propsPage,
    onPageChange: propsOnPageChange,
    search: propsSearch,
    onSearchChange: propsOnSearchChange,
    sortBy: propsSortBy,
    sortOrder: propsSortOrder,
    onSortChange: propsOnSortChange,
    hideSearch = false,
}: DataTableProps<T>) {
    const [internalData, setInternalData] = React.useState<T[]>([])
    const [internalLoading, setInternalLoading] = React.useState(true)
    const [internalPage, setInternalPage] = React.useState(1)
    const [pageSize] = React.useState(initialPageSize)
    const [internalTotal, setInternalTotal] = React.useState(0)
    const [internalTotalPages, setInternalTotalPages] = React.useState(0)
    const [internalSearch, setInternalSearch] = React.useState("")
    const [sort, setSort] = React.useState<{ column: keyof T; direction: 'asc' | 'desc' } | undefined>()

    // Derived values: props take precedence over internal state
    const isLoading = propsLoading ?? internalLoading
    const page = propsPage ?? internalPage
    const setPage = propsOnPageChange ?? setInternalPage
    const data = initialData ?? internalData
    const total = propsTotal ?? internalTotal
    const totalPages = propsTotalPages ?? internalTotalPages
    const [search, setSearch] = [propsSearch ?? internalSearch, propsOnSearchChange ?? setInternalSearch]
    const [localSearch, setLocalSearch] = React.useState(search)
    const [debouncedSearch, setDebouncedSearch] = React.useState(search)

    // Ref to avoid stable closure issues while keeping debounce stable
    const setSearchRef = React.useRef(setSearch)

    React.useEffect(() => {
        setSearchRef.current = setSearch
    }, [setSearch])

    // Sync local search with prop search (e.g. when URL changes)
    React.useEffect(() => {
        setLocalSearch(search)
        setDebouncedSearch(search)
    }, [search])

    const debouncedOnSearchChange = React.useMemo(
        () => debounce((value: string) => {
            setSearchRef.current(value)
            setDebouncedSearch(value)
            // Note: page reset is handled by setFilters in useTableFilters when query changes
        }, 500),
        [] // Keep it absolutely stable
    )

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setLocalSearch(value)
        debouncedOnSearchChange(value)
    }

    const loadData = React.useCallback(async () => {
        // Only load if not using purely external data
        if (initialData && !fetchData) {
            setInternalLoading(true)
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

                setInternalData(paginatedData);
                setInternalTotal(totalItems);
                setInternalTotalPages(calculatedTotalPages);
            } catch (error) {
                console.error("Error processing client-side data:", error);
            } finally {
                setInternalLoading(false);
            }
            return;
        }

        // Server-side fetching (internal management)
        if (fetchData) {
            setInternalLoading(true)
            try {
                const result = await fetchData({
                    page,
                    pageSize,
                    search: debouncedSearch,
                    sort,
                })
                setInternalData(result.data)
                setInternalTotal(result.total)
                setInternalTotalPages(result.totalPages)
            } catch (error) {
                console.error("Failed to fetch data:", error)
            } finally {
                setInternalLoading(false)
            }
        }
    }, [fetchData, initialData, page, pageSize, debouncedSearch, sort, searchKeys, refreshTrigger])

    React.useEffect(() => {
        loadData()
    }, [loadData])

    const handleSort = (columnKey: keyof T) => {
        const colStr = String(columnKey)
        if (propsOnSortChange) {
            // Controlled (server-side) mode
            if (propsSortBy === colStr) {
                if (propsSortOrder === 'asc') {
                    propsOnSortChange(colStr, 'desc')
                } else if (propsSortOrder === 'desc') {
                    propsOnSortChange(colStr, undefined)
                } else {
                    propsOnSortChange(colStr, 'asc')
                }
            } else {
                propsOnSortChange(colStr, 'asc')
            }
        } else {
            // Uncontrolled (client-side) mode
            setSort(prev => {
                if (prev?.column === columnKey) {
                    return prev.direction === 'asc'
                        ? { column: columnKey, direction: 'desc' }
                        : undefined
                }
                return { column: columnKey, direction: 'asc' }
            })
        }
    }

    const renderSortIcon = (columnKey: keyof T) => {
        const colStr = String(columnKey)
        const activeSortBy = propsSortBy ?? (sort?.column ? String(sort.column) : undefined)
        const activeSortOrder = propsSortOrder ?? sort?.direction
        if (activeSortBy !== colStr || !activeSortOrder) return <ChevronsUpDown className="ml-2 h-4 w-4" />
        return activeSortOrder === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                {!hideSearch ? (
                    <div className="relative max-w-sm flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search..."
                            value={localSearch}
                            onChange={handleSearchChange}
                            className="pl-9"
                        />
                    </div>
                ) : (
                    <div className="flex-1" />
                )}
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
                        {isLoading ? (
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
                                <TableRow 
                                    key={item.id}
                                    onClick={() => onRowClick?.(item)}
                                    className={cn(onRowClick && "cursor-pointer hover:bg-muted/50")}
                                >
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
