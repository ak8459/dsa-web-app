import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TopicDetailPage from './pages/TopicDetailPage.jsx';

// Filter for routes that require an authenticated user session
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-10 h-10 border-3 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin" />
        <p className="text-text-secondary text-sm">Verifying session...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Filter for public-only auth routes (redirects if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="w-10 h-10 border-3 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin" />
        <p className="text-text-secondary text-sm">Verifying session...</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <Routes>
      {/* Protected routes wrapped in ProgressProvider to share solved state */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <ProgressProvider>
              <DashboardPage />
            </ProgressProvider>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/topics/:id" 
        element={
          <ProtectedRoute>
            <ProgressProvider>
              <TopicDetailPage />
            </ProgressProvider>
          </ProtectedRoute>
        } 
      />

      {/* Public auth routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } 
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
