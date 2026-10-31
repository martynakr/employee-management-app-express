import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import EmployeesPage from "./pages/EmployeesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<EmployeesPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
