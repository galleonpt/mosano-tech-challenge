import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { CountriesProvider } from "./contexts/CountriesContext";
import { VisitorsProvider } from "./contexts/VisitorsContext";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { Revisited } from "./pages/Revisited";

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
        </BrowserRouter>
    );
}

export default App;
