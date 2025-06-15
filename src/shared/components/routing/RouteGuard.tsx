import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { RouteConfig } from '../../types/routing';
import { useAuthStore } from '../../../presentation/store/authStore';

interface RouteGuardProps {
  route: RouteConfig;
  children: React.ReactNode;
}

export function RouteGuard({ route, children }: RouteGuardProps) {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();

  // Handle private routes
  if (route.isPrivate && !isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Handle role-based access
  if (route.roles && route.roles.length > 0 && user) {
    const hasRequiredRole = route.roles.some(role => 
      user.roles?.includes(role)
    );

    if (!hasRequiredRole) {
      return (
        <Navigate 
          to="/unauthorized" 
          state={{ from: location.pathname }} 
          replace 
        />
      );
    }
  }

  // Handle redirects
  if (route.redirect) {
    return <Navigate to={route.redirect} replace />;
  }

  return <>{children}</>;
}