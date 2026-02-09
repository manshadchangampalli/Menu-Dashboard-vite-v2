import { X, MoreVertical } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import type { Order } from "../../pages/orders/order.type";

interface OrderDetailHeaderProps {
    order: Order;
    onClose: () => void;
}

const OrderDetailHeader = ({ order, onClose }: OrderDetailHeaderProps) => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
                <button
                    onClick={onClose}
                    className="size-8 rounded-full flex items-center justify-center text-app-muted hover:bg-app-accent hover:text-app-text cursor-pointer transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-app-text leading-none tracking-tight">
                            Order {order.id}
                        </h3>
                        <StatusBadge status={order.status} />
                    </div>
                    <p className="text-xs text-app-muted font-medium mt-1.5">
                        Placed on {order.timestamp}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="size-8 rounded-md border border-app-border flex items-center justify-center hover:bg-app-accent text-app-muted transition-colors">
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default OrderDetailHeader;
