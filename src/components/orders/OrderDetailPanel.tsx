import type { Order } from "../../pages/orders/order.type";
import SidePanel from "../ui/SidePanel";
import OrderDetailHeader from "./OrderDetailHeader";
import CustomerInfoSection from "./CustomerInfoSection";
import OrderItemsSection from "./OrderItemsSection";
import PaymentSummarySection from "./PaymentSummarySection";
import OrderActionsFooter from "./OrderActionsFooter";

interface OrderDetailPanelProps {
    order: Order | null;
    open: boolean;
    onClose: () => void;
    onProcess: () => void;
}

const OrderDetailPanel = ({ order, open, onClose, onProcess }: OrderDetailPanelProps) => {
    if (!order) return null;

    return (
        <SidePanel
            open={open}
            onClose={onClose}
            title={<OrderDetailHeader order={order} onClose={onClose} />}
            footer={<OrderActionsFooter onProcess={onProcess} />}
        >
            <CustomerInfoSection order={order} />

            {order.items && (
                <OrderItemsSection items={order.items} />
            )}

            <PaymentSummarySection
                subtotal={order.total_amount}
                serviceFee={0}
                tax={0}
                total={`$${order.total_amount.toFixed(2)}`}
            />
        </SidePanel>
    );
};

export default OrderDetailPanel;
