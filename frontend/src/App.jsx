import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import EngineerDashboard from "./pages/engineer/EngineerDashboard.jsx";
import OperatorDashboard from "./pages/operator/OperatorDashboard.jsx";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Default Route */}
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                {/* Login Route */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Admin Dashboard */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Engineer Dashboard */}
                <Route
                    path="/engineer/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["ENGINEER"]}>
                            <EngineerDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Operator Dashboard */}
                <Route
                    path="/operator/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["OPERATOR"]}>
                            <OperatorDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Unauthorized */}
                <Route
                    path="/unauthorized"
                    element={<h1>403 - Access Denied</h1>}
                />

                {/* Invalid URL */}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;