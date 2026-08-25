import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CountriesProvider } from "./contexts/CountriesContext";
import { VisitorsProvider } from "./contexts/VisitorsContext";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/home";
import { Revisited } from "./pages/revisited";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CountriesProvider>
                    <VisitorsProvider>
                        <MainLayout>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route
                                    path="/revisited"
                                    element={
                                        <ProtectedRoute>
                                            <Revisited />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="*"
                                    element={<Navigate to="/" replace />}
                                />
                            </Routes>
                        </MainLayout>
                    </VisitorsProvider>
                </CountriesProvider>
            </AuthProvider>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
