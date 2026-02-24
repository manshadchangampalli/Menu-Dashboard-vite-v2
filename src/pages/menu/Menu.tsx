import { ChevronRight, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router";
import { useState } from "react";
import MenuTable from "../../components/menu/MenuTable";
import MenuCreatePanel from "../../components/menus/MenuCreatePanel";
import { useTableQuery } from "../../hooks/useTableFilters";
import { getMenus } from "./service/menu.api";
import { MENU_CONFIG } from "./config/menu.config";
import type { Menu as MenuType } from "./service/menu.type";

const Menu = () => {
    const navigate = useNavigate();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);

    const {
        data: response,
        isLoading,
        filters,
        setFilters
    } = useTableQuery(
        "menus",
        getMenus,
        {
            limit: MENU_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
            sortBy: "created_at",
            sortOrder: "desc"
        }
    );

    return (
        <main className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-app-muted mb-2 uppercase tracking-widest">
                        <span>Admin</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Inventory</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-app-text">Menus</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-app-text">Menus</h2>
                    <p className="text-app-muted mt-1 font-medium">Manage your different menus (Breakfast, Lunch, Dinner, etc.)</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="flex items-center gap-2 h-9 bg-app-text text-white font-semibold text-sm hover:bg-app-text/90 transition-all shadow-sm"
                    >
                        <Plus className="size-[18px]" />
                        Create Menu
                    </Button>
                </div>
            </div>

            <MenuCreatePanel
                open={isCreateOpen || !!selectedMenu}
                onClose={() => {
                    setIsCreateOpen(false);
                    setSelectedMenu(null);
                }}
                initialData={selectedMenu || undefined}
            />

            <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden p-4">
                <MenuTable
                    data={response?.data || []}
                    loading={isLoading}
                    total={response?.meta?.total || 0}
                    totalPages={response?.meta?.totalPages || 1}
                    page={filters.page}
                    onPageChange={(page: number) => setFilters({ page })}
                    onRowClick={(menu: MenuType) => navigate(`/menu/${menu._id}`)}
                    onEdit={(menu: MenuType) => setSelectedMenu(menu)}
                    filters={filters}
                />
            </div>
        </main>
    );
};

export default Menu;
