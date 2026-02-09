
import StatusBadge from "../ui/StatusBadge";

export interface Order {
    id: string;
    customer: {
        name: string;
        initials: string;
    };
    items: string;
    total: string;
    status: "Pending" | "Preparing" | "Ready" | "Delivered" | "Cancelled";
    timestamp: string;
    timeAgo: string;
}

interface OrdersTableProps {
    orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
    return (
        <div className="bg-white border border-app-border rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-app-border bg-app-bg/50">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-app-muted">Order ID</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-app-muted">Timestamp</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-app-muted">Customer</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-app-muted">Items</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-app-muted">Total Price</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-app-muted text-center">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-app-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-app-border">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-app-bg/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-bold text-app-text">{order.id}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-app-text font-medium">{order.timestamp}</div>
                                    <div className="text-[10px] text-app-muted font-bold uppercase tracking-tight">{order.timeAgo}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-full bg-app-accent flex items-center justify-center text-xs font-bold text-app-text">
                                            {order.customer.initials}
                                        </div>
                                        <div className="text-sm font-semibold text-app-text">{order.customer.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-app-text font-medium">{order.items}</div>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-app-text">{order.total}</td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <StatusBadge status={order.status} />
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="h-8 px-3 rounded border border-app-border text-xs font-bold hover:bg-app-bg transition-colors">Details</button>
                                        <button className="h-8 px-3 rounded bg-app-text text-white text-xs font-bold hover:bg-app-text/90 transition-all">
                                            {order.status === "Pending" ? "Process" : order.status === "Preparing" ? "Mark Ready" : "Deliver"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;
