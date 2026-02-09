import type { MenuItem } from "../../pages/menu/menu.type";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Edit2, Trash2, X } from "lucide-react";

interface MenuDetailPanelProps {
    item: MenuItem | null;
    open: boolean;
    onClose: () => void;
}

const MenuDetailPanel = ({ item, open, onClose }: MenuDetailPanelProps) => {
    if (!item) return null;

    const Header = (
        <div className="flex items-center justify-between w-full">
            <h2 className="text-lg font-bold text-app-text">Item Details</h2>
            <button
                onClick={onClose}
                className="size-8 rounded-full flex items-center justify-center text-app-muted hover:bg-app-accent hover:text-app-text cursor-pointer transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );

    const Footer = (
        <div className="grid grid-cols-2 gap-3">
            <Button
                variant="outline"
                className="h-12 w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold"
            >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Item
            </Button>
            <Button className="h-12 w-full bg-app-text text-white hover:bg-app-text/90 font-bold">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Item
            </Button>
        </div>
    );

    return (
        <SidePanel
            open={open}
            onClose={onClose}
            title={Header}
            footer={Footer}
        >
            <div className="p-6 space-y-6">
                {/* Image & Main Info */}
                <div className="space-y-4">
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-app-border bg-app-bg">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="text-2xl font-bold text-app-text leading-tight">{item.name}</h1>
                            <span className="text-xl font-bold text-app-text">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                            </span>
                        </div>
                        <span className="inline-block mt-2 px-2.5 py-1 rounded-full border border-app-border bg-app-accent text-xs font-bold text-app-text uppercase tracking-wider">
                            {item.category}
                        </span>
                    </div>
                </div>

                <div className="h-px bg-app-border" />

                {/* Description */}
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-app-muted uppercase tracking-widest">Description</h3>
                    <p className="text-sm text-app-text leading-relaxed">
                        {item.longDescription}
                    </p>
                </div>

                <div className="h-px bg-app-border" />

                {/* Settings */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-app-muted uppercase tracking-widest">Settings</h3>

                    <div className="flex items-center justify-between p-4 bg-app-bg/50 rounded-lg border border-app-border">
                        <div className="space-y-0.5">
                            <div className="text-sm font-bold text-app-text">Stock Status</div>
                            <div className="text-xs text-app-muted">Toggle item availability</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`text-xs font-bold ${item.inStock ? "text-emerald-600" : "text-app-muted"}`}>
                                {item.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                            <Switch checked={item.inStock} onCheckedChange={(c) => console.log(c)} />
                        </div>
                    </div>
                </div>
            </div>
        </SidePanel>
    );
};

export default MenuDetailPanel;
