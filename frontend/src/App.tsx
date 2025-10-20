import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import HomePage from "./pages/home/HomePage";
import AlbumPage from "./pages/album/AlbumPage";
import ChatPage from "./pages/chat/ChatPage";
import AdminPage from "./pages/admin/AdminPage";

import MainLayout from "./layout/MainLayout";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useChatStore } from "./store/useChatStore";
import { useEffect } from "react";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check both snake_case (backend) and camelCase (just in case)
  const isVerified = user.is_verified || user.isVerified;
  if (!isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  // Check both snake_case (backend) and camelCase (just in case)
  const isVerified = user?.is_verified || user?.isVerified;
  if (isAuthenticated && isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// protect admin routes
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const isVerified = user.is_verified || user.isVerified;
  if (!isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  const isAdmin = user.is_admin || user.isAdmin;
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, user } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      initSocket(user.id);
    } else {
      disconnectSocket();
    }
  }, [user, initSocket, disconnectSocket]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <Routes>
        {/* Auth routes with floating shapes background */}
        <Route
          path="/signup"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
              <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
              <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
              <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />
              <RedirectAuthenticatedUser>
                <SignUpPage />
              </RedirectAuthenticatedUser>
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
              <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
              <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
              <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            </div>
          }
        />
        <Route
          path="/verify-email"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
              <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
              <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
              <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />
              <EmailVerificationPage />
            </div>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
              <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
              <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
              <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            </div>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
              <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
              <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
              <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            </div>
          }
        />

        {/* Main app routes with MainLayout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>

        {/* Admin route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        {/* catch all routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
