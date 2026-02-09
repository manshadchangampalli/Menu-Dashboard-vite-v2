import { CreditCard } from "lucide-react";

interface PaymentSummarySectionProps {
    subtotal: number;
    serviceFee: number;
    tax: number;
    total: string; // The mocked total is a string like "$63.96"
    paymentMethod?: string;
}

const PaymentSummarySection = ({ 
    subtotal, 
    serviceFee, 
    tax, 
    total, 
    paymentMethod 
}: PaymentSummarySectionProps) => {
    return (
        <section className="p-6 border-b border-app-border">
            <h4 className="text-[11px] font-bold text-app-muted uppercase tracking-wider mb-4">
                Payment Summary
            </h4>
            <div className="space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-app-muted">Subtotal</span>
                    <span className="text-app-text font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-app-muted">Service Fee (10%)</span>
                    <span className="text-app-text font-medium">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-app-muted">Tax (8%)</span>
                    <span className="text-app-text font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-dashed border-app-border flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-app-text">Total Price</span>
                        {paymentMethod && (
                            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-app-muted font-bold uppercase">
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>Paid via {paymentMethod}</span>
                            </div>
                        )}
                    </div>
                    <span className="text-2xl font-bold text-app-text">{total}</span>
                </div>
            </div>
        </section>
    );
};

export default PaymentSummarySection;
