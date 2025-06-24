import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import Profile from "./pages/Profile";

import DietPlan from "./pages/DietPlan";
import TrackSymptoms from "./pages/TrackSymptoms";
import Insights from "./pages/Insights";
import Lifestyle from "./pages/Lifestyle";
import MedicalGuidance from "./pages/MedicalGuidance";
import GeneticAnalysis from "./pages/GeneticAnalysis";

import ProtectedRoute from "./utils/ProtectedRoute";
import RedirectIfAuthenticated from "./utils/RedirectIfAuthenticated"; // ✅ new

// import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />

        {/* ✅ Prevent access if already logged in */}
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <Signup />
            </RedirectIfAuthenticated>
          }
        />

        {/* ✅ Accessible without auth (for email verification) */}
        {/* <Route path="/verify-email" element={<VerifyEmail />} /> */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ✅ Auth-protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/diet-plan"
          element={
            <ProtectedRoute>
              <DietPlan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/track-symptoms"
          element={
            <ProtectedRoute>
              <TrackSymptoms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <Insights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lifestyle"
          element={
            <ProtectedRoute>
              <Lifestyle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/guidance"
          element={
            <ProtectedRoute>
              <MedicalGuidance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/genetic-analysis"
          element={
            <ProtectedRoute>
              <GeneticAnalysis />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
