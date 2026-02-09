
interface FilterTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const FilterTabs = ({ tabs, activeTab, onTabChange }: FilterTabsProps) => {
    return (
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all shadow-sm ${
                        activeTab === tab
                            ? "bg-app-text text-white font-semibold"
                            : "bg-white border border-app-border text-app-muted hover:bg-app-bg hover:text-app-text"
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default FilterTabs;
