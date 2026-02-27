import { ChevronRight, Plus, ListFilter } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useTableQuery } from "../../hooks/useTableFilters";
import type { MenuItem } from "./menuItems.type";
import { useSearchParams } from "react-router";
import { getMenuItems } from "./service/menuItems.api";

const MenuItemList = () => {
    const [searchParams] = useSearchParams();
    const menuId = searchParams.get("menuId") || undefined;
    const categoryId = searchParams.get("categoryId") || undefined;

    const {
        data: response,
        isLoading
    } = useTableQuery(
        "menu-items",
        getMenuItems,
        {
            limit: 10,
            menuId,
            categoryId,
            organization_id: "69948af4435dccf179e3e939"
        }
    );

    return (
        <main className="flex-1 overflow-y-auto p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-app-muted mb-2 uppercase tracking-widest">
                        <span>Admin</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span>Menu Management</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-app-text">Menu Items</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-app-text">Menu Items</h2>
                    <p className="text-app-muted mt-1 font-medium">Manage how products are sold across your different menus and categories.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 h-9 border-app-border bg-white font-semibold text-sm hover:bg-app-bg transition-colors shadow-sm"
                    >
                        <ListFilter className="size-[18px]" />
                        Filter
                    </Button>
                    <Button
                        className="flex items-center gap-2 h-9 bg-app-text text-white font-semibold text-sm hover:bg-app-text/90 transition-all shadow-sm"
                    >
                        <Plus className="size-[18px]" />
                        Assign Product
                    </Button>
                </div>
            </div>

            <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden min-h-[400px]">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-app-muted font-bold animate-pulse uppercase tracking-widest text-xs">Loading items...</p>
                    </div>
                ) : (
                    <div className="p-0">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-app-border bg-app-bg/30">
                                    <th className="px-6 py-4 text-[10px] font-bold text-app-muted uppercase tracking-wider">Product</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-app-muted uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-app-muted uppercase tracking-wider">Base Price</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-app-muted uppercase tracking-wider">Selling Price</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-app-muted uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-app-border">
                                {response?.data?.map((item: MenuItem) => (
                                    <tr key={item._id} className="hover:bg-app-bg/20 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-app-text group-hover:text-black transition-colors">{item.product_id.name}</div>
                                            <div className="text-[10px] text-app-muted uppercase font-bold">{item.product_id.type}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-app-text">
                                            {item.category_id}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-app-text">
                                            {item.base_price} AED
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-app-text">
                                            {item.selling_price} AED
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.is_available ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                {item.is_available ? 'AVAILABLE' : 'OUT OF STOCK'}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!response?.data || response.data.length === 0) && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-app-muted font-medium">
                                            No menu items found for the selected criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MenuItemList;
