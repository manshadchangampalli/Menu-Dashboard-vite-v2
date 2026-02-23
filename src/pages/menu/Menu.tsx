import { ChevronRight, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import MenuTable from "../../components/menu/MenuTable";
import { useNavigate } from "react-router";
import { useState } from "react";
import MenuCreatePanel from "../../components/menus/MenuCreatePanel";

const Menu = () => {
    const navigate = useNavigate();
    const [isCreateOpen, setIsCreateOpen] = useState(false);

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
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
            />

            <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden p-4">
                <MenuTable
                    onRowClick={(menu) => navigate(`/menu/${menu._id}`)}
                />
            </div>
        </main>
    );
};

export default Menu;
