import { Mail, Phone, MapPin } from "lucide-react";
import type { Order } from "../../pages/orders/order.type";

interface CustomerInfoSectionProps {
    customer: Order["customer"];
}

const CustomerInfoSection = ({ customer }: CustomerInfoSectionProps) => {
    return (
        <section className="p-6 border-b border-app-border">
            <h4 className="text-[11px] font-bold text-app-muted uppercase tracking-wider mb-4">
                Customer Information
            </h4>
            <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-app-accent flex items-center justify-center text-base font-bold text-app-text border border-app-border/50">
                    {customer.initials}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-app-text">{customer.name}</p>
                        {customer.isRepeat && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-bold border border-blue-100">
                                Repeat Customer
                            </span>
                        )}
                    </div>
                    <div className="mt-2 space-y-1.5">
                        {customer.email && (
                            <div className="flex items-center gap-2 text-xs text-app-muted">
                                <Mail className="w-4 h-4" />
                                <span>{customer.email}</span>
                            </div>
                        )}
                        {customer.phone && (
                            <div className="flex items-center gap-2 text-xs text-app-muted">
                                <Phone className="w-4 h-4" />
                                <span>{customer.phone}</span>
                            </div>
                        )}
                        {customer.address && (
                            <div className="flex items-start gap-2 text-xs text-app-muted mt-1">
                                <MapPin className="w-4 h-4 mt-0.5" />
                                <span className="whitespace-pre-line">{customer.address}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerInfoSection;
