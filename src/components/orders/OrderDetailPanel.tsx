import type { Order } from "../../pages/orders/order.type";
import SidePanel from "../ui/SidePanel";
import OrderDetailHeader from "./OrderDetailHeader";
import CustomerInfoSection from "./CustomerInfoSection";
import OrderItemsSection from "./OrderItemsSection";
import PaymentSummarySection from "./PaymentSummarySection";
import OrderTimelineSection from "./OrderTimelineSection";
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
            <CustomerInfoSection customer={order.customer} />

            {order.itemsDetail && (
                <OrderItemsSection items={order.itemsDetail} />
            )}

            <PaymentSummarySection
                subtotal={order.subtotal || 0}
                serviceFee={order.serviceFee || 0}
                tax={order.tax || 0}
                total={order.total}
                paymentMethod={order.paymentMethod}
            />

            {order.timeline && (
                <OrderTimelineSection timeline={order.timeline} />
            )}
        </SidePanel>
    );
};

export default OrderDetailPanel;
