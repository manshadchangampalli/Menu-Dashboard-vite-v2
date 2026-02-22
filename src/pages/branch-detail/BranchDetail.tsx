import { useParams } from "react-router";
import { useBranchDetail } from "./hooks/useBranchDetail";
import BranchHeader from "../../components/branch-detail/BranchHeader";
import BranchStats from "../../components/branch-detail/BranchStats";
import BranchGeneralInfo from "../../components/branch-detail/BranchGeneralInfo";
import BranchHours from "../../components/branch-detail/BranchHours";
import BranchQuickActions from "../../components/branch-detail/BranchQuickActions";
import BranchStaffList from "../../components/branch-detail/BranchStaffList";

const BranchDetail = () => {
    const { id } = useParams();
    const { data: response, isLoading, isError } = useBranchDetail(id);

    if (isLoading) {
        return <div className="flex-1 flex items-center justify-center">Loading branch details...</div>;
    }

    if (isError || !response?.success) {
        return <div className="flex-1 flex items-center justify-center text-red-500">Error loading branch details. Please try again later.</div>;
    }

    const branchData = response.data;

    return (
        <main className="flex-1 overflow-y-auto p-8">
            <BranchHeader 
                id={branchData?._id}
                name={branchData?.name} 
                status={branchData?.status} 
                type={branchData?.branch_type} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    <BranchStats occupancy_stats={branchData?.occupancy_stats} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <BranchGeneralInfo 
                            address_detail={branchData?.address_detail} 
                            email={branchData?.email} 
                            phone={branchData?.phone} 
                        />
                        <BranchHours operating_hours={branchData?.operating_hours} />
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
