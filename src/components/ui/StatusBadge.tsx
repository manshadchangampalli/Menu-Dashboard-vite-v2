
interface StatusBadgeProps {
    status: "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const getStatusStyles = () => {
        switch (status) {
            case "Pending":
                return "bg-orange-100 text-orange-700 border-orange-200";
            case "Preparing":
                return "bg-blue-100 text-blue-700 border-blue-200";
            case "Ready":
                return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Delivered":
                return "bg-gray-100 text-gray-700 border-gray-200";
            case "Cancelled":
                return "bg-red-100 text-red-700 border-red-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyles()}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
