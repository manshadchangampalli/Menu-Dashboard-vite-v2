import { Button } from "./button";
interface FilterTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const FilterTabs = ({ tabs, activeTab, onTabChange }: FilterTabsProps) => {
    return (
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            {tabs.map((tab) => (
                <Button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    variant={activeTab === tab ? "default" : "outline"}
                    className={`rounded-full shadow-sm text-sm font-medium transition-all ${activeTab === tab
                            ? "bg-app-text text-white hover:bg-app-text/90"
                            : "border-app-border text-app-muted hover:bg-app-bg hover:text-app-text bg-white"
                        }`}
                >
                    {tab}
                </Button>
            ))}
        </div>
    );
};

export default FilterTabs;
