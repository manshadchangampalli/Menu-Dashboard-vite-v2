import { Ban, Printer, CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

interface OrderActionsFooterProps {
    onProcess: () => void;
}

const OrderActionsFooter = ({ onProcess }: OrderActionsFooterProps) => {
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
                <Button
                    variant="outline"
                    className="h-11 border-app-border font-bold text-sm text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors"
                    onClick={() => { }}
                >
                    <Ban className="w-5 h-5 mr-2" />
                    Reject Order
                </Button>
                <Button
                    variant="outline"
                    className="h-11 border-app-border font-bold text-sm text-app-text hover:bg-app-accent transition-colors"
                    onClick={() => { }}
                >
                    <Printer className="w-5 h-5 mr-2" />
                    Print Receipt
                </Button>
            </div>
            <Button
                onClick={onProcess}
                className="flex-1 h-12 w-full bg-app-text text-white rounded-lg font-bold hover:bg-app-text/90 shadow-lg flex items-center justify-center gap-2 transition-all"
            >
                <CheckCircle className="w-5 h-5 mr-2" />
                Process Order
            </Button>
        </div>
    );
};

export default OrderActionsFooter;
