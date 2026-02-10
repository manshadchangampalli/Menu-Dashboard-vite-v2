import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronRight, ChevronDown, ChevronUp, Clock, Edit2, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { MOCK_MENUS } from "../menu/menu.config";
import { MOCK_CATEGORIES } from "../categories/categories.config";
import { MOCK_MENU_ITEMS } from "../menu-items/menuItems.config";
import type { Category } from "../categories/categories.type";
import type { MenuItem } from "../menu-items/menuItems.type";
import { Switch } from "../../components/ui/switch";

const MenuDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const menu = MOCK_MENUS.find(m => m.id === id);

    const categories = useMemo(() => {
        if (!menu) return [];
        return MOCK_CATEGORIES.filter(c => c.menuId === menu.id);
    }, [menu]);

    const menuItems = useMemo(() => {
        // Group items by category name for faster lookup
        const itemsByCategory: Record<string, MenuItem[]> = {};
        MOCK_MENU_ITEMS.forEach(item => {
            if (!itemsByCategory[item.category]) {
                itemsByCategory[item.category] = [];
            }
            itemsByCategory[item.category].push(item);
        });
        return itemsByCategory;
    }, []);

    if (!menu) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-xl font-bold text-app-text">Menu Not Found</h2>
                <Button variant="link" onClick={() => navigate("/menu")}>Back to Menus</Button>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <main className="flex-1 overflow-y-auto bg-app-bg min-h-full pb-10">
            {/* Header Section */}
            <div className="bg-white border-b border-app-border">
                <div className=" mx-auto px-8 py-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-app-muted mb-4 uppercase tracking-widest">
                        <span className="cursor-pointer hover:text-app-text transition-colors" onClick={() => navigate("/menu")}>Menus</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-app-text">{menu.name}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="space-y-4 max-w-2xl">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-app-text mb-2">{menu.name}</h1>
                                {menu.description && (
                                    <p className="text-app-muted font-medium leading-relaxed">{menu.description}</p>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${menu.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${menu.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                                    {menu.status === 'active' ? 'Active' : 'Inactive'}
                                </div>
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border border-app-border bg-white text-app-text uppercase tracking-wider">
                                    {menu.type}
                                </div>
                                {menu.availability && (
                                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-app-border bg-white text-app-text">
                                        <Clock className="w-3.5 h-3.5 mr-1.5 text-app-muted" />
                                        {menu.availability.startTime} - {menu.availability.endTime}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <Button variant="outline" className="gap-2 font-semibold">
                                <Edit2 className="w-4 h-4" />
                                Edit Details
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className=" mx-auto px-8 py-8 space-y-8">

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-app-border shadow-sm">
                        <div className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-1">Categories</div>
                        <div className="text-2xl font-bold text-app-text">{categories.length}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-app-border shadow-sm">
                        <div className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-1">Total Items</div>
                        <div className="text-2xl font-bold text-app-text">{categories.reduce((acc, cat) => acc + (menuItems[cat.name]?.length || 0), 0)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-app-border shadow-sm">
                        <div className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-1">Created</div>
                        <div className="text-sm font-bold text-app-text">{formatDate(menu.createdAt)}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-app-border shadow-sm">
                        <div className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-1">Last Updated</div>
                        <div className="text-sm font-bold text-app-text">{formatDate(menu.updatedAt)}</div>
                    </div>
                </div>

                {/* Categories List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-app-text">Menu Categories</h3>
                        <Button size="sm" className="gap-2 bg-app-text text-white hover:bg-app-text/90">
                            <Plus className="w-4 h-4" />
                            Add Category
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {categories.map((category) => (
                            <CategorySection
                                key={category.id}
                                category={category}
                                items={menuItems[category.name] || []}
                            />
                        ))}
                        {categories.length === 0 && (
                            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-app-border">
                                <p className="text-app-muted font-medium">No categories added to this menu yet.</p>
                                <Button variant="link" className="mt-2 text-app-text font-bold">Add your first category</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

// Sub-component for Category Accordion
const CategorySection = ({ category, items }: { category: Category, items: MenuItem[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Filter items to only show first 5 if not enhanced, but for now show all

    return (
        <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden">
            <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-md ${isOpen ? 'bg-app-text text-white' : 'bg-app-bg text-app-text'}`}>
                        <category.icon className="size-5" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-app-text">{category.name}</h4>
                        <p className="text-xs text-app-muted font-medium">{items.length} Items</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${category.isActive ? 'text-emerald-600' : 'text-app-muted'}`}>
                            {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <Switch checked={category.isActive} onCheckedChange={() => { }} className="scale-75" />
                    </div>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-app-muted" /> : <ChevronDown className="w-5 h-5 text-app-muted" />}
                </div>
            </div>

            {isOpen && (
                <div className="border-t border-app-border bg-gray-50/50 p-4">
                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 gap-1">
                            {items.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-3 bg-white rounded border border-app-border hover:border-app-text/30 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded border border-app-border bg-gray-100 overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-app-text">{item.name}</div>
                                            <div className="text-xs text-app-text font-semibold">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Switch checked={item.inStock} onCheckedChange={() => { }} className="scale-75" />
                                        <Button variant="ghost" size="icon" className="size-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Edit2 className="size-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4 text-xs text-app-muted font-medium">
                            No items in this category.
                        </div>
                    )}
                    <div className="mt-4 pt-3 border-t border-app-border flex justify-center">
                        <Button variant="ghost" size="sm" className="text-xs font-bold text-app-text h-8 gap-1.5">
                            <Plus className="size-3.5" />
                            Add Item to {category.name}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuDetail;
