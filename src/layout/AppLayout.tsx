
import Sidebar from "../components/sidebar/sidebar";
import { Outlet } from "react-router";

const AppLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-app-bg">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;