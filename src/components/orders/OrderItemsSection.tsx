import type { OrderItem } from "../../pages/orders/order.type";

interface OrderItemsSectionProps {
    items: OrderItem[];
}

const OrderItemsSection = ({ items }: OrderItemsSectionProps) => {
    return (
        <section className="p-6 border-b border-app-border">
            <h4 className="text-[11px] font-bold text-app-muted uppercase tracking-wider mb-4">
                Order Items
            </h4>
            <div className="space-y-5">
                {items.map((item) => (
                    <div key={item.menu_item_id} className="flex items-start justify-between group">
                        <div className="flex gap-4">
                            <div className="size-6 bg-app-accent rounded flex items-center justify-center text-xs font-bold text-app-text border border-app-border">
                                {item.quantity}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-app-text">{item.name}</p>
                            </div>
                        </div>
                        <span className="text-sm font-bold text-app-text">
                            ${(item.unit_price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OrderItemsSection;
