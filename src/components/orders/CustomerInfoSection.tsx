import { Mail, Phone, MapPin } from "lucide-react";
import type { Order } from "../../pages/orders/order.type";

interface CustomerInfoSectionProps {
    order: Order;
}

const getInitials = (name: string) =>
    name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

const CustomerInfoSection = ({ order }: CustomerInfoSectionProps) => {
    return (
        <section className="p-6 border-b border-app-border">
            <h4 className="text-[11px] font-bold text-app-muted uppercase tracking-wider mb-4">
                Customer Information
            </h4>
            <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-app-accent flex items-center justify-center text-base font-bold text-app-text border border-app-border/50">
                    {getInitials(order.customer_name)}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-app-text">{order.customer_name}</p>
                    </div>
                    <div className="mt-2 space-y-1.5">
                        {order.customer_email && (
                            <div className="flex items-center gap-2 text-xs text-app-muted">
                                <Mail className="w-4 h-4" />
                                <span>{order.customer_email}</span>
                            </div>
                        )}
                        {order.customer_phone && (
                            <div className="flex items-center gap-2 text-xs text-app-muted">
                                <Phone className="w-4 h-4" />
                                <span>{order.customer_phone}</span>
                            </div>
                        )}
                        {order.customer_address && (
                            <div className="flex items-start gap-2 text-xs text-app-muted mt-1">
                                <MapPin className="w-4 h-4 mt-0.5" />
                                <span className="whitespace-pre-line">{order.customer_address}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerInfoSection;
