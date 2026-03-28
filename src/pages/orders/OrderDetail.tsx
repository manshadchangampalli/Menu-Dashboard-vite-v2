import { useParams, useNavigate } from "react-router";
import { useOrderById } from "./hooks/useOrders";
import { ArrowLeft, Package, User, Phone, Hash, MapPin, FileText, Clock, CheckCircle2, XCircle, ChefHat, Bell, Loader2 } from "lucide-react";

const STATUS_CONFIG = {
    PENDING:    { label: "Pending",    color: "bg-yellow-100 text-yellow-800 border-yellow-200",  icon: Clock },
    PREPARING:  { label: "Preparing",  color: "bg-blue-100 text-blue-800 border-blue-200",        icon: ChefHat },
    READY:      { label: "Ready",      color: "bg-green-100 text-green-800 border-green-200",      icon: Bell },
    COMPLETED:  { label: "Completed",  color: "bg-gray-100 text-gray-800 border-gray-200",         icon: CheckCircle2 },
    CANCELLED:  { label: "Cancelled",  color: "bg-red-100 text-red-800 border-red-200",            icon: XCircle },
} as const;

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string | null }) => {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-app-accent flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-app-muted" />
            </div>
            <div>
                <p className="text-xs font-semibold text-app-muted uppercase tracking-wide">{label}</p>
                <p className="text-sm font-medium text-app-text mt-0.5">{value}</p>
            </div>
        </div>
    );
};

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { order, isLoading, isError } = useOrderById(id);

    if (isLoading) {
        return (
            <main className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-app-muted">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <p className="text-sm font-medium">Loading order details...</p>
                </div>
            </main>
        );
    }

    if (isError || !order) {
        return (
            <main className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 font-semibold">Order not found</p>
                    <button onClick={() => navigate("/orders")} className="mt-3 text-sm text-app-muted hover:text-app-text underline">
                        Back to Orders
                    </button>
                </div>
            </main>
        );
    }

    const status = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.PENDING;
    const StatusIcon = status.icon;
    const formattedDate = new Date(order.created_at).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });

    return (
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-app-bg">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={() => navigate("/orders")}
                    className="w-9 h-9 rounded-lg border border-app-border flex items-center justify-center text-app-muted hover:bg-white hover:text-app-text transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-app-text">{order.order_uuid}</h1>
                    <p className="text-xs text-app-muted mt-0.5">Created {formattedDate}</p>
                </div>
                <div className="ml-auto">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${status.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Left column */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Order Items */}
                    <div className="bg-white border border-app-border rounded-xl shadow-sm overflow-hidden">
                        <div className="px-5 py-4 border-b border-app-border flex items-center gap-2">
                            <Package className="w-4 h-4 text-app-muted" />
                            <h2 className="text-sm font-bold text-app-text">Order Items</h2>
                        </div>
                        <div className="divide-y divide-app-border">
                            {order.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between px-5 py-3.5">
                                    <div>
                                        <p className="text-sm font-semibold text-app-text">{item.name}</p>
                                        <p className="text-xs text-app-muted mt-0.5">
                                            {item.quantity} × ${item.unit_price.toFixed(2)}
                                        </p>
                                    </div>
                                    <p className="text-sm font-bold text-app-text">${item.total_price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 py-4 bg-app-bg border-t border-app-border flex justify-between items-center">
                            <span className="text-sm font-semibold text-app-muted">Total</span>
                            <span className="text-lg font-black text-app-text">${order.total_amount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                        <div className="bg-white border border-app-border rounded-xl shadow-sm p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <FileText className="w-4 h-4 text-app-muted" />
                                <h2 className="text-sm font-bold text-app-text">Notes</h2>
                            </div>
                            <p className="text-sm text-app-muted leading-relaxed">{order.notes}</p>
                        </div>
                    )}
                </div>

                {/* Right column */}
                <div className="space-y-4">

                    {/* Customer Info */}
                    <div className="bg-white border border-app-border rounded-xl shadow-sm p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="w-4 h-4 text-app-muted" />
                            <h2 className="text-sm font-bold text-app-text">Customer</h2>
                        </div>
                        <div className="space-y-3">
                            <InfoRow icon={User} label="Name" value={order.customer_name || "Walk-in"} />
                            <InfoRow icon={Phone} label="Phone" value={order.customer_phone} />
                            <InfoRow icon={Hash} label="Table" value={order.table_number} />
                            <InfoRow icon={MapPin} label="Address" value={order.customer_address} />
                        </div>
                    </div>

                    {/* Order Meta */}
                    <div className="bg-white border border-app-border rounded-xl shadow-sm p-5">
                        <h2 className="text-sm font-bold text-app-text mb-4">Order Info</h2>
                        <div className="space-y-3">
                            <InfoRow icon={Hash} label="Order ID" value={order.order_uuid} />
                            <InfoRow icon={Clock} label="Created" value={formattedDate} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default OrderDetail;
