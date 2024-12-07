import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import RouteGamePage from "./pages/RouteGamePage";
import LoginPage from "./pages/LoginPage";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {
  useEffect(() => {
    localStorage.removeItem("authenticated");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={<ProtectedRoute element={<Layout><HomePage /></Layout>} />}
        />
        <Route
          path="/route-game"
          element={<ProtectedRoute element={<Layout><RouteGamePage /></Layout>} />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
