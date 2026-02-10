import Sidebar from "../components/sidebar/sidebar";
import { Outlet } from "react-router";
import TopBar from "../components/layout/TopBar";

const AppLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-app-bg">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <TopBar />
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;