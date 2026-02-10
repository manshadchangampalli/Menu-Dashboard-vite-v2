
import BranchHeader from "../../components/branch-detail/BranchHeader";
import BranchStats from "../../components/branch-detail/BranchStats";
import BranchGeneralInfo from "../../components/branch-detail/BranchGeneralInfo";
import BranchHours from "../../components/branch-detail/BranchHours";
import BranchQuickActions from "../../components/branch-detail/BranchQuickActions";
import BranchStaffList from "../../components/branch-detail/BranchStaffList";

const BranchDetail = () => {
    // In a real app, use id to fetch data. For now, we use static mock data.
    return (
        <main className="flex-1 overflow-y-auto p-8">
            <BranchHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    <BranchStats />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BranchGeneralInfo />
                        <BranchHours />
                    </div>
                </div>

                <div className="space-y-4">
                    <BranchQuickActions />
                    <BranchStaffList />
                </div>
            </div>
        </main>
    );
};

export default BranchDetail;
