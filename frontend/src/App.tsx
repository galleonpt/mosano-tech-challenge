import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MainLayout } from "./components/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CountriesProvider } from "./contexts/CountriesContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { VisitorsProvider } from "./contexts/VisitorsContext";
import { Home } from "./pages/home";
import { Revisited } from "./pages/revisited";

function App() {
    return (
        <BrowserRouter>
            <LanguageProvider>
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
            </LanguageProvider>
            <ToastContainer />
        </BrowserRouter>
    );
}

export default App;
