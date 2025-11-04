// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BusinessProfile from "./pages/BusinessProfile";
import GoogleAuthCallback from "./pages/GoogleAuthCallback";
import AuthRedirect from "./components/AuthRedirect";
import LandingNew from "./pages/LandingNew";
import ProtectedRoute from "./components/ProtectedRoute";
import Onboarding from "./pages/Onboarding";
import DashboardMain from "./pages/DashboardMain";
import Create from "./pages/Create";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import Campaigns from "./pages/Campaigns";
import Recommendations from "./pages/Recommendations";
import Connections from "./pages/Connections";
import "./styles/darkmode.css";

const Placeholder = ({ title }) => (
  <div style={{ padding: 24 }}>
    <h1>{title}</h1>
    <p>Coming soon.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingNew />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<GoogleAuthCallback />} />
        
        {/* Protected Routes */}
        <Route path="/app" element={<AuthRedirect />} />
        <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardMain /></ProtectedRoute>} />
        <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
        <Route path="/business-profile" element={<ProtectedRoute><BusinessProfile /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
        <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/campaigns" element={<ProtectedRoute><Campaigns /></ProtectedRoute>} />
        <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
        <Route path="/connections" element={<ProtectedRoute><Connections /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
