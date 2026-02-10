import StaffHeader from "../../components/staff-detail/StaffHeader";
import StaffProfileCard from "../../components/staff-detail/StaffProfileCard";
import StaffPerformanceStats from "../../components/staff-detail/StaffPerformanceStats";
import StaffActivityLog from "../../components/staff-detail/StaffActivityLog";
import StaffDocuments from "../../components/staff-detail/StaffDocuments";
import BranchAccessCard from "@/components/staff-detail/BranchAccessCard";

const StaffDetail = () => {
    return (
        <main className="flex-1 overflow-y-auto p-8">
            <StaffHeader />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="col-span-1 lg:col-span-4 space-y-8">
                    <StaffProfileCard />
                    <BranchAccessCard />
                </div>

                <div className="col-span-1 lg:col-span-8 space-y-8">
                    <StaffPerformanceStats />
                    <StaffActivityLog />
                    <StaffDocuments />
                </div>
            </div>
        </main>
    );
};

export default StaffDetail;
