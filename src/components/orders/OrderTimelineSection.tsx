import type { OrderTimelineStep } from "../../pages/orders/order.type";

interface OrderTimelineSectionProps {
    timeline: OrderTimelineStep[];
}

const OrderTimelineSection = ({ timeline }: OrderTimelineSectionProps) => {
    return (
        <section className="p-6">
            <h4 className="text-[11px] font-bold text-app-muted uppercase tracking-wider mb-4">
                Order Timeline
            </h4>
            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-app-border">
                {timeline.map((step, index) => (
                    <div key={index} className="relative pl-8">
                        <div className={`absolute left-0 top-1.5 size-[24px] rounded-full border-2 border-white ring-2 flex items-center justify-center
                            ${step.completed
                                ? "bg-orange-100 ring-orange-50"
                                : "bg-app-bg ring-app-bg"
                            }`}
                        >
                            <div className={`size-2 rounded-full ${step.completed ? "bg-orange-500" : "bg-app-muted/30"}`} />
                        </div>
                        <p className={`text-sm ${step.completed ? "font-bold text-app-text" : "font-medium text-app-muted"}`}>
                            {step.status}
                        </p>
                        <p className={`text-xs mt-0.5 ${step.completed ? "text-app-muted" : "text-app-muted/60"}`}>
                            {step.time}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OrderTimelineSection;
