import { Outlet } from "react-router";
import Chatbot from "../components/Chatbot/Chatbot";

const MainLayout = () => {
    return (
        <>
            <main className="flex flex-col gap-section min-h-screen font-body items-center py-section">
                <div className="w-[80%]">
                    <Outlet />
                </div>
            </main>

            <Chatbot />
        </>
    );
};

export default MainLayout;
