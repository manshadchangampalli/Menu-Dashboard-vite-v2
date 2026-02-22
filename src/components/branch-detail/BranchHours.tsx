interface OperatingHour {
    day: string;
    open_time: string;
    close_time: string;
    is_closed: boolean;
}

interface BranchHoursProps {
    operating_hours?: OperatingHour[];
}

const BranchHours = ({ operating_hours }: BranchHoursProps) => {
    return (
        <div className="bg-white border border-app-border rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-app-border">
                <h3 className="text-sm font-bold text-app-text uppercase tracking-wider">Operational Hours</h3>
            </div>
            <div className="p-6">
                <ul className="space-y-3">
                    {operating_hours?.map((hour, index) => (
                        <li 
                            key={index}
                            className="flex items-center justify-between"
                        >
                            <span className={`text-sm ${hour.is_closed ? "font-medium text-red-500" : "font-medium text-app-text"}`}>
                                {hour.day}
                            </span>
                            <span className={`text-sm ${hour.is_closed ? "text-red-500 font-bold uppercase text-[10px]" : "text-app-muted"}`}>
                                {hour.is_closed ? "Closed" : `${hour.open_time} - ${hour.close_time}`}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BranchHours;
