import { DataTable, type Column } from "../ui/data-table";
import { User, CheckCircle2, XCircle, Mail, Phone } from "lucide-react";
import type { CustomerData } from "../../pages/customers/customer.type";
import { useNavigate } from "react-router";
import { type TableFilters } from "../../hooks/useTableFilters";
import { CustomSelect } from "../ui/CustomSelect";

interface CustomersTableProps {
  data: CustomerData[];
  loading?: boolean;
  total?: number;
  totalPages?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  filters: TableFilters;
  onFilterChange: (newFilters: Partial<TableFilters>) => void;
}

const VERIFIED_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Verified", value: "true" },
  { label: "Unverified", value: "false" },
];

const LOGIN_METHOD_LABELS: Record<string, string> = {
  PASSWORD: "Password",
  EMAIL_OTP: "Email OTP",
};

const CustomersTable = ({
  data,
  loading,
  total,
  totalPages,
  page,
  onPageChange,
  filters,
  onFilterChange,
}: CustomersTableProps) => {
  const navigate = useNavigate();

  const columns: Column<any>[] = [
    {
      header: "Customer",
      accessorKey: "full_name",
      cell: (customer) => (
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-app-bg flex items-center justify-center border border-app-border">
            <User className="size-5 text-app-muted" />
          </div>
          <div>
            <div className="text-sm font-bold text-app-text">{customer.full_name}</div>
            <div className="text-[10px] text-app-muted font-medium uppercase tracking-tighter">
              {LOGIN_METHOD_LABELS[customer.login_method] ?? customer.login_method}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessorKey: "email",
      cell: (customer) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-sm text-app-text">
            <Mail className="size-3.5 text-app-muted" />
            {customer.email}
          </div>
          {customer.phone && (
            <div className="flex items-center gap-1.5 text-xs text-app-muted">
              <Phone className="size-3 text-app-muted" />
              {customer.phone}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Verified",
      accessorKey: "is_verified",
      cell: (customer) =>
        customer.is_verified ? (
          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
            <CheckCircle2 className="size-4" />
            Verified
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-app-muted text-xs font-bold">
            <XCircle className="size-4" />
            Unverified
          </div>
        ),
    },
    {
      header: "Addresses",
      accessorKey: "addresses",
      cell: (customer) => (
        <span className="text-sm text-app-text font-medium">
          {customer.addresses?.length ?? 0}
        </span>
      ),
    },
    {
      header: "Joined",
      accessorKey: "created_at",
      cell: (customer) => (
        <span className="text-xs text-app-muted">
          {new Date(customer.created_at).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      total={total}
      totalPages={totalPages}
      page={page}
      onPageChange={onPageChange}
      search={filters.query}
      onSearchChange={(query) => onFilterChange({ query })}
      sortBy={filters.sortBy}
      sortOrder={filters.sortOrder}
      onSortChange={(sortBy, sortOrder) =>
        onFilterChange({ sortBy: sortOrder ? sortBy : undefined, sortOrder })
      }
      onRowClick={(customer) => navigate(`/customers/${customer._id}`)}
      actions={
        <div className="w-40">
          <CustomSelect
            label=""
            value={
              filters.is_verified === undefined
                ? "all"
                : String(filters.is_verified)
            }
            onValueChange={(value) =>
              onFilterChange({
                is_verified: value === "all" ? undefined : value === "true",
              })
            }
            options={VERIFIED_OPTIONS}
          />
        </div>
      }
    />
  );
};

export default CustomersTable;
