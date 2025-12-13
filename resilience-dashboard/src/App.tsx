import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

import { Home } from "@/pages/Home";
import { Auth } from "@/pages/auth/Auth";
import { AnalystDashboard } from "@/pages/analyst/AnalystDashboard";
import { ExecutiveDashboard } from "@/pages/executive/ExecutiveDashboard";
import { Navbar } from "@/components/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/analyst"
            element={
              <ProtectedRoute allowedRole="analyst">
                <AnalystDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/executive"
            element={
              <ProtectedRoute allowedRole="executive">
                <ExecutiveDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
