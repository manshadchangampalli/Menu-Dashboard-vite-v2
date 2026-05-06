import { ChevronRight, TrendingUp, Users } from "lucide-react";
import { useTableQuery } from "../../hooks/useTableFilters";
import { getCustomers } from "./service/customers.api";
import CustomersTable from "../../components/customers/CustomersTable";

const Customers = () => {
  const {
    data: response,
    isLoading,
    filters,
    setFilters,
  } = useTableQuery("customers", getCustomers, {
    limit: 10,
    sortBy: "created_at",
    sortOrder: "desc",
  });

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-app-muted mb-2 uppercase tracking-widest">
            <span>Management</span>
            <ChevronRight className="size-3.5" />
            <span className="text-app-text font-bold">Customers</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-app-text">Customers</h2>
          <p className="text-app-muted mt-1 font-medium text-sm">
            Users registered through the customer app.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-app-border p-4 rounded-lg shadow-sm overflow-hidden">
          <CustomersTable
            data={response?.data || []}
            loading={isLoading}
            total={response?.meta?.total || 0}
            totalPages={response?.meta?.totalPages || 1}
            page={filters.page}
            onPageChange={(page) => setFilters({ page })}
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
            <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">
              Total Customers
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-app-text">
                {response?.meta?.total || 0}
              </p>
              <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                <TrendingUp className="size-3.5" />
                Updated
              </span>
            </div>
          </div>
          <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
            <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">
              Verified
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-app-text">
                {(response?.data ?? []).filter((c: any) => c.is_verified).length}
              </p>
              <Users className="size-4 text-emerald-500" />
            </div>
          </div>
          <div className="bg-white border border-app-border p-5 rounded-lg shadow-sm">
            <h3 className="text-app-muted text-[10px] font-bold uppercase tracking-wider mb-1">
              Unverified
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-app-text">
                {(response?.data ?? []).filter((c: any) => !c.is_verified).length}
              </p>
              <Users className="size-4 text-app-muted" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Customers;
