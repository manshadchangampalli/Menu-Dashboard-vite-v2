import { Contact, FileText } from "lucide-react";

const StaffDocuments = () => {
    return (
        <div className="flex gap-4">
            <div className="flex-1 bg-white border border-app-border p-4 rounded-xl flex items-center gap-4 hover:border-app-text transition-colors cursor-pointer shadow-sm">
                <div className="size-10 rounded-lg bg-app-bg flex items-center justify-center text-app-text">
                    <Contact className="size-6" />
                </div>
                <div>
                    <h5 className="text-sm font-bold text-app-text">Shift History</h5>
                    <p className="text-[10px] text-app-muted font-bold uppercase tracking-tight">Access full punch logs</p>
                </div>
            </div>
            <div className="flex-1 bg-white border border-app-border p-4 rounded-xl flex items-center gap-4 hover:border-app-text transition-colors cursor-pointer shadow-sm">
                <div className="size-10 rounded-lg bg-app-bg flex items-center justify-center text-app-text">
                    <FileText className="size-6" />
                </div>
                <div>
                    <h5 className="text-sm font-bold text-app-text">Staff Documents</h5>
                    <p className="text-[10px] text-app-muted font-bold uppercase tracking-tight">Contracts & Certifications</p>
                </div>
            </div>
        </div>
    );
};

export default StaffDocuments;
