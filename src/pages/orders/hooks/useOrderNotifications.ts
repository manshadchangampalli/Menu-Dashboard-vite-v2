import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3333/api";
const API_VERSION = import.meta.env.VITE_API_VERSION || "v1";

export const useOrderNotifications = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const streamUrl = `${API_BASE_URL}/${API_VERSION}/orders/stream`;
        
        console.log("Connecting to Order Stream:", streamUrl);
        
        const eventSource = new EventSource(streamUrl, { withCredentials: true });

        eventSource.onopen = () => {
            console.log("✅ Order Stream Connected");
        };

        // Standard message listener (catches untyped events or 'message' typed events)
        eventSource.onmessage = (event) => {
            if (event.data === "heartbeat") return; // Skip heartbeats
            console.log("📩 SSE Message Received (Generic):", event);
            handleOrderEvent(event.data, "Notification Received");
        };

        // Specialized listener for our named event
        eventSource.addEventListener("order.created", (event: MessageEvent) => {
            console.log("📩 SSE Message Received (order.created):", event);
            handleOrderEvent(event.data, "New Order Received!");
        });

        eventSource.addEventListener("order.updated", (event: MessageEvent) => {
            console.log("📩 SSE Message Received (order.updated):", event);
            handleOrderEvent(event.data, "Order Status Updated!");
        });

        const handleOrderEvent = (data: any, title: string) => {
            try {
                const order = typeof data === 'string' ? JSON.parse(data) : data;
                
                toast.success(title, {
                    description: `Order ${order.order_uuid} is now ${order.status.toLowerCase()}.`,
                    duration: 5000,
                });

                queryClient.invalidateQueries({ queryKey: ["orders"] });
                queryClient.invalidateQueries({ queryKey: ["order", order._id] });
            } catch (error) {
                console.error("❌ Error parsing order event:", error);
            }
        };

        eventSource.addEventListener("ping", () => {
            console.log("💓 Stream Heartbeat");
        });

        eventSource.onerror = (error) => {
            console.error("⚠️ SSE Connection Error:", error);
        };

        return () => {
            console.log("🔌 Closing Order Stream");
            eventSource.close();
        };
    }, [queryClient]);
};
