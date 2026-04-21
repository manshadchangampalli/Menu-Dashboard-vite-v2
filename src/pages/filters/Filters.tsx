import { useState } from "react";
import { ChevronRight, Plus, Loader2, Pencil, Trash2, CheckCircle2, XCircle, Star } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ConfirmDialog } from "../../components/ui/confirm-dialog";
import FilterFormPanel from "../../components/filters/FilterFormPanel";
import SortFormPanel from "../../components/filters/SortFormPanel";
import {
  useDeleteFilter,
  useDeleteSortOption,
  useFilters,
  useSortOptions,
} from "./hooks/useFilters";
import {
  type Filter,
  type SortOption,
  FilterType,
} from "./service/filters.type";
import { toast } from "sonner";

const typeLabel: Record<FilterType, string> = {
  [FilterType.SINGLE]: "Single",
  [FilterType.MULTI]: "Multi",
  [FilterType.RANGE]: "Range",
};

const FiltersPage = () => {
  const { data: filters, isLoading: loadingFilters } = useFilters();
  const { data: sorts, isLoading: loadingSorts } = useSortOptions();
  const { mutate: deleteFilter, isPending: deletingFilter } = useDeleteFilter();
  const { mutate: deleteSort, isPending: deletingSort } = useDeleteSortOption();

  const [editingFilter, setEditingFilter] = useState<Filter | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [filterToDelete, setFilterToDelete] = useState<Filter | null>(null);

  const [editingSort, setEditingSort] = useState<SortOption | null>(null);
  const [isSortPanelOpen, setIsSortPanelOpen] = useState(false);
  const [sortToDelete, setSortToDelete] = useState<SortOption | null>(null);

  const confirmDeleteFilter = () => {
    if (!filterToDelete) return;
    deleteFilter(filterToDelete._id, {
      onSuccess: () => {
        toast.success("Filter deleted");
        setFilterToDelete(null);
      },
      onError: (e: { message?: string }) => toast.error(e?.message || "Delete failed"),
    });
  };

  const confirmDeleteSort = () => {
    if (!sortToDelete) return;
    deleteSort(sortToDelete._id, {
      onSuccess: () => {
        toast.success("Sort option deleted");
        setSortToDelete(null);
      },
      onError: (e: { message?: string }) => toast.error(e?.message || "Delete failed"),
    });
  };

  return (
    <main className="flex-1 overflow-y-auto p-8 space-y-10">
      <div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-app-muted mb-2 uppercase tracking-widest">
          <span>Menu</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-app-text">Filters & Sorting</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-app-text">Filters & Sorting</h2>
        <p className="text-app-muted mt-1 font-medium">
          Control what shoppers can narrow and reorder on the customer menu.
        </p>
      </div>

      {/* Filters */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-app-text">Filters</h3>
          <Button
            onClick={() => {
              setEditingFilter(null);
              setIsFilterPanelOpen(true);
            }}
            className="h-9 bg-app-text text-white font-semibold text-sm hover:bg-app-text/90"
          >
            <Plus className="size-4 mr-1" /> Add filter
          </Button>
        </div>

        {loadingFilters ? (
          <LoadingRow />
        ) : !filters?.length ? (
          <EmptyState text="No filters yet. Add one to let customers narrow the menu." />
        ) : (
          <div className="bg-white border border-app-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-app-bg text-app-muted text-xs uppercase font-bold">
                <tr>
                  <Th>Name</Th>
                  <Th>Type</Th>
                  <Th>Source</Th>
                  <Th>Options</Th>
                  <Th>Order</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {filters.map((f) => (
                  <tr key={f._id} className="border-t border-app-border">
                    <Td className="font-semibold text-app-text">{f.name}</Td>
                    <Td>{typeLabel[f.type]}</Td>
                    <Td className="text-app-muted">{f.source}</Td>
                    <Td>
                      {f.type === FilterType.RANGE
                        ? `${f.ranges?.length ?? 0} ranges`
                        : `${f.options?.length ?? 0} options`}
                    </Td>
                    <Td>{f.sort_order}</Td>
                    <Td>
                      <ActiveBadge active={f.is_active} />
                    </Td>
                    <Td className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <IconBtn
                          onClick={() => {
                            setEditingFilter(f);
                            setIsFilterPanelOpen(true);
                          }}
                        >
                          <Pencil className="size-4" />
                        </IconBtn>
                        <IconBtn onClick={() => setFilterToDelete(f)} danger>
                          <Trash2 className="size-4" />
                        </IconBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Sort options */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-app-text">Sort options</h3>
          <Button
            onClick={() => {
              setEditingSort(null);
              setIsSortPanelOpen(true);
            }}
            className="h-9 bg-app-text text-white font-semibold text-sm hover:bg-app-text/90"
          >
            <Plus className="size-4 mr-1" /> Add sort
          </Button>
        </div>

        {loadingSorts ? (
          <LoadingRow />
        ) : !sorts?.length ? (
          <EmptyState text="No sort options yet. Add one so customers can reorder the list." />
        ) : (
          <div className="bg-white border border-app-border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-app-bg text-app-muted text-xs uppercase font-bold">
                <tr>
                  <Th>Label</Th>
                  <Th>Field</Th>
                  <Th>Direction</Th>
                  <Th>Order</Th>
                  <Th>Default</Th>
                  <Th>Status</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>
              <tbody>
                {sorts.map((s) => (
                  <tr key={s._id} className="border-t border-app-border">
                    <Td className="font-semibold text-app-text">{s.label}</Td>
                    <Td>{s.field}</Td>
                    <Td>{s.direction.toUpperCase()}</Td>
                    <Td>{s.sort_order}</Td>
                    <Td>
                      {s.is_default && (
                        <span className="inline-flex items-center gap-1 text-amber-600 text-xs font-semibold">
                          <Star className="size-3.5 fill-current" /> Default
                        </span>
                      )}
                    </Td>
                    <Td>
                      <ActiveBadge active={s.is_active} />
                    </Td>
                    <Td className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <IconBtn
                          onClick={() => {
                            setEditingSort(s);
                            setIsSortPanelOpen(true);
                          }}
                        >
                          <Pencil className="size-4" />
                        </IconBtn>
                        <IconBtn onClick={() => setSortToDelete(s)} danger>
                          <Trash2 className="size-4" />
                        </IconBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <FilterFormPanel
        open={isFilterPanelOpen}
        onClose={() => {
          setIsFilterPanelOpen(false);
          setEditingFilter(null);
        }}
        filter={editingFilter}
      />

      <SortFormPanel
        open={isSortPanelOpen}
        onClose={() => {
          setIsSortPanelOpen(false);
          setEditingSort(null);
        }}
        sort={editingSort}
      />

      <ConfirmDialog
        open={!!filterToDelete}
        onOpenChange={(o) => !o && setFilterToDelete(null)}
        title="Delete filter"
        description={`Delete "${filterToDelete?.name}"? This cannot be undone.`}
        confirmText={deletingFilter ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={confirmDeleteFilter}
        variant="destructive"
      />

      <ConfirmDialog
        open={!!sortToDelete}
        onOpenChange={(o) => !o && setSortToDelete(null)}
        title="Delete sort option"
        description={`Delete "${sortToDelete?.label}"? This cannot be undone.`}
        confirmText={deletingSort ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={confirmDeleteSort}
        variant="destructive"
      />
    </main>
  );
};

const Th = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`text-left px-4 py-3 ${className}`}>{children}</th>
);
const Td = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>
);
const IconBtn = ({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`size-8 rounded-md flex items-center justify-center transition-colors ${
      danger
        ? "text-app-muted hover:text-red-500 hover:bg-red-50"
        : "text-app-muted hover:text-app-text hover:bg-app-bg"
    }`}
  >
    {children}
  </button>
);

const ActiveBadge = ({ active }: { active: boolean }) =>
  active ? (
    <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-semibold">
      <CheckCircle2 className="size-3.5" /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-app-muted text-xs font-semibold">
      <XCircle className="size-3.5" /> Inactive
    </span>
  );

const LoadingRow = () => (
  <div className="h-40 flex flex-col items-center justify-center text-app-muted bg-white border border-app-border rounded-xl">
    <Loader2 className="size-6 animate-spin mb-2" />
    <p className="text-sm font-medium">Loading...</p>
  </div>
);

const EmptyState = ({ text }: { text: string }) => (
  <div className="h-40 flex items-center justify-center text-sm text-app-muted bg-white border border-dashed border-app-border rounded-xl">
    {text}
  </div>
);

export default FiltersPage;
