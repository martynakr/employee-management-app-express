import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <main className="flex flex-col gap-section min-h-screen font-body items-center py-section">
            <Outlet />
        </main>
    );
};

export default MainLayout;
