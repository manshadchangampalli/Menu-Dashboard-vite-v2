import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Utensils, StickyNote, ChefHat, CheckCircle, Printer, ArrowRight } from "lucide-react";
import type { Order } from "../../pages/orders/order.type";
import StatusBadge from "../ui/StatusBadge";

interface ProcessOrderModalProps {
    order: Order | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ProcessOrderModal = ({ order, open, onOpenChange }: ProcessOrderModalProps) => {
    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[min(90vw,900px)] max-h-[90vh] p-0 gap-0 overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-app-border flex items-center justify-between bg-white">
                    <div className="flex items-center gap-4">
                        <StatusBadge status={order.status} />
                        <div>
                            <DialogTitle className="text-2xl font-bold text-app-text tracking-tight">
                                Order {order.order_uuid || order._id}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-app-muted font-medium mt-1">
                                Placed {order.created_at} • {order.customer_name} {order.table_number && `• ${order.table_number}`}
                            </DialogDescription>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-app-bg/50">
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-xs font-bold text-app-muted uppercase tracking-widest flex items-center gap-2">
                            <Utensils className="w-4 h-4" /> Order Items
                        </h3>
                        <div className="space-y-4">
                            {order.items?.map((item) => (
                                <div key={item.menu_item_id} className="flex items-start justify-between p-5 bg-white rounded-xl border border-app-border shadow-sm">
                                    <div className="flex gap-4">
                                        <span className="text-xl font-bold text-app-text min-w-8">{item.quantity}×</span>
                                        <div>
                                            <h4 className="text-lg font-bold text-app-text leading-tight">{item.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {order.notes && (
                            <div className="pt-4">
                                <h3 className="text-xs font-bold text-app-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <StickyNote className="w-4 h-4" /> Kitchen Notes
                                </h3>
                                <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg text-orange-900 text-base font-medium italic">
                                    "{order.notes}"
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-8 bg-white p-3 rounded-xl border border-app-border h-fit shadow-sm">
                        <section>
                            <h3 className="text-xs font-bold text-app-muted uppercase tracking-widest mb-4">Quick Status Update</h3>
                            <div className="flex flex-col gap-3">
                                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all">
                                    <ChefHat className="w-5 h-5" />
                                    Start Preparing
                                </Button>
                                <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all">
                                    <CheckCircle className="w-5 h-5" />
                                    Mark as Ready
                                </Button>
                            </div>
                        </section>
                        <div className="h-px bg-app-border"></div>
                        <section>
                            <h3 className="text-xs font-bold text-app-muted uppercase tracking-widest mb-4">KOT Printing</h3>
                            <Button variant="outline" className="w-full h-10 bg-white border border-app-border hover:bg-app-accent text-app-text rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all">
                                <Printer className="w-4 h-4" />
                                Print KOT Again
                            </Button>
                        </section>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-white border-t border-app-border flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div>
                            <span className="text-[10px] text-app-muted font-bold uppercase block leading-none mb-1">Total Value</span>
                            <span className="text-2xl font-black text-app-text leading-none">${order.total_amount.toFixed(2)}</span>
                        </div>
                        <div className="h-8 w-px bg-app-border"></div>
                        <div>
                            <span className="text-[10px] text-app-muted font-bold uppercase block leading-none mb-1">Customer</span>
                            <span className="text-sm font-bold text-app-text leading-none">{order.customer_name || "Unknown"}</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            className="px-6 h-12 bg-white border border-app-border rounded-lg font-bold text-app-text hover:bg-app-accent hover:text-app-text cursor-pointer transition-all"
                            onClick={() => onOpenChange(false)}
                        >
                            Close
                        </Button>
                        <Button className="px-8 h-12 bg-app-text text-white rounded-lg font-bold hover:bg-app-text/90 shadow-lg flex items-center gap-2 transition-all">
                            Confirm & Print KOT
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProcessOrderModal;
