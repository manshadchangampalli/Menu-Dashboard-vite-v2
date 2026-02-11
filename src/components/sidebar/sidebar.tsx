
import { SIDEBAR_ITEMS } from "./sidebar.config";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

const Sidebar = () => {
    const location = useLocation();
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

    const handleLogout = () => {
        // Add actual logout logic here
        console.log("User logged out");
        setIsLogoutDialogOpen(false);
    };

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    const getLinkClass = (path: string) => {
        const baseClass = "flex items-center gap-3 px-3 py-2 rounded-md transition-all group";
        const activeClass = "bg-app-bg text-app-text font-semibold border border-app-border/50 shadow-sm";
        const inactiveClass = "text-app-muted hover:text-app-text hover:bg-app-accent";
        
        return `${baseClass} ${isActive(path) ? activeClass : inactiveClass}`;
    };

    const mainItems = SIDEBAR_ITEMS.filter(item => ["overview", "live-orders", "reservations"].includes(item.id));
    const inventoryItems = SIDEBAR_ITEMS.filter(item => ["menus", "categories", "menu-items"].includes(item.id));
    const managementItems = SIDEBAR_ITEMS.filter(item => ["branches", "staff-members", "analytics"].includes(item.id));
    const footerItems = SIDEBAR_ITEMS.filter(item => ["settings", "logout"].includes(item.id));

    return (
        <aside className="w-64 shrink-0 flex flex-col border-r border-app-border bg-white h-full font-display">
            <div className="p-6 flex items-center gap-3">
                <div className="bg-app-text size-8 rounded flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-xl">restaurant</span>
                </div>
                <div>
                    <h1 className="text-sm font-bold tracking-tight text-app-text">BistroOS</h1>
                    <p className="text-[10px] text-app-muted uppercase tracking-widest font-bold">Admin Panel</p>
                </div>
            </div>

            <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
                <div className="text-[11px] font-bold text-app-muted px-3 py-2 uppercase tracking-wider">Main</div>
                
                {mainItems.map((item) => (
                    <Link 
                        key={item.id} 
                        to={item.url} 
                        className={getLinkClass(item.url)}
                    >
                        {/* Using Lucide icons as requested first (though HTML has material symbols) */}
                        {/* If user STRICTLY requested Material Symbols same as HTML, I should change config. */}
                        {/* But previous instruction was "use appropriate icons from [Lucide]", and current request says "sidebar design same like this". */}
                        {/* Keeping Lucide icons for now as per previous strong instruction, but matching styles. */}
                        {/* Actually, the user said "add the sidebar design same like this . the bg button color text everything". */}
                        {/* I will keep Lucide icons but match the style classes. */}
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm">{item.title}</span>
                         {item.id === "live-orders" && (
                             <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-app-text text-[10px] font-bold text-white">12</span>
                         )}
                    </Link>
                ))}

                <div className="pt-4 text-[11px] font-bold text-app-muted px-3 py-2 uppercase tracking-wider">Inventory & Menu</div>
                
                {inventoryItems.map((item) => (
                    <Link 
                        key={item.id} 
                        to={item.url} 
                        className={getLinkClass(item.url)}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm">{item.title}</span>
                    </Link>
                ))}

                <div className="pt-4 text-[11px] font-bold text-app-muted px-3 py-2 uppercase tracking-wider">Management</div>
                
                {managementItems.map((item) => (
                    <Link 
                        key={item.id} 
                        to={item.url} 
                        className={getLinkClass(item.url)}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm">{item.title}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-app-border space-y-0.5">
                {footerItems.map((item) => (
                    item.id === "logout" ? (
                        <button
                            key={item.id}
                            onClick={() => setIsLogoutDialogOpen(true)}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-all text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm font-semibold">{item.title}</span>
                        </button>
                    ) : (
                        <Link 
                            key={item.id} 
                            to={item.url} 
                            className={getLinkClass(item.url)}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-sm">{item.title}</span>
                        </Link>
                    )
                ))}
            </div>

            <ConfirmDialog
                open={isLogoutDialogOpen}
                onOpenChange={setIsLogoutDialogOpen}
                title="Confirm Logout"
                description="Are you sure you want to log out from the application?"
                confirmText="Logout"
                cancelText="Cancel"
                onConfirm={handleLogout}
                variant="destructive"
            />
        </aside>
    );
};

export default Sidebar;