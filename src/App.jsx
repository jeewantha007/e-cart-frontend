import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './Pages/login/Login';
import Register from './Pages/register/Register';
import Dashboard from './Pages/dashboard/Dashboard';
import AdminDashboard from './AdminPages/AdminDashboard';

const App = () => {
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  // Whenever location changes (user navigates), update auth
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('authToken'));
    setRole(localStorage.getItem('role'));
  }, [location]);

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!isAuthenticated) return <Navigate to="/" replace />;
    if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;
    return element;
  };

  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute
            element={<Dashboard />}
            allowedRoles={['user', 'admin']}
          />
        }
      />

      <Route
        path="/admin-dashboard/*"
        element={
          <ProtectedRoute
            element={<AdminDashboard />}
            allowedRoles={['admin']}
          />
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
