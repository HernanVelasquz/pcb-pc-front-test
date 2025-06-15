import { useMemo } from 'react';
import { lazy } from 'react';
import type { RouteConfig } from '../types/routing';

// Lazy load components for better performance
const LoginPage = lazy(() => import('../../presentation/pages/LoginPage').then(m => ({ default: m.LoginPage })));
const DashboardPage = lazy(() => import('../../presentation/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const TestPage = lazy(() => import('../../presentation/pages/TestPage').then(m => ({ default: m.TestPage })));
const UnauthorizedPage = lazy(() => import('../components/pages/UnauthorizedPage').then(m => ({ default: m.UnauthorizedPage })));
const NotFoundPage = lazy(() => import('../components/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Lazy load layouts
const DefaultLayout = lazy(() => import('../components/layouts/DefaultLayout').then(m => ({ default: m.DefaultLayout })));
const AuthLayout = lazy(() => import('../components/layouts/AuthLayout').then(m => ({ default: m.AuthLayout })));
const AdminLayout = lazy(() => import('../components/layouts/AdminLayout').then(m => ({ default: m.AdminLayout })));

export function useRouteConfig(): RouteConfig[] {
  return useMemo(() => [
    // Public routes
    {
      path: '/login',
      component: LoginPage,
      isPrivate: false,
      layout: DefaultLayout,
      meta: {
        title: 'Login',
        description: 'Sign in to your account'
      }
    },
    {
      path: '/unauthorized',
      component: UnauthorizedPage,
      isPrivate: false,
      layout: DefaultLayout,
      meta: {
        title: 'Unauthorized',
        description: 'Access denied'
      }
    },

    // Private routes with authentication
    {
      path: '/',
      component: DashboardPage,
      isPrivate: true,
      layout: AuthLayout,
      meta: {
        title: 'Dashboard',
        description: 'Your test dashboard'
      }
    },
    {
      path: '/dashboard',
      component: DashboardPage,
      isPrivate: true,
      layout: AuthLayout,
      meta: {
        title: 'Dashboard',
        description: 'Your test dashboard'
      }
    },
    {
      path: '/test/:id',
      component: TestPage,
      isPrivate: true,
      layout: AuthLayout,
      roles: ['student', 'admin'],
      meta: {
        title: 'Test',
        description: 'Take your test'
      }
    },

    // Admin routes with role-based access
    {
      path: '/admin',
      component: lazy(() => import('../../presentation/pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage }))),
      isPrivate: true,
      layout: AdminLayout,
      roles: ['admin'],
      meta: {
        title: 'Admin Dashboard',
        description: 'Administrative dashboard'
      }
    },
    {
      path: '/admin/tests',
      component: lazy(() => import('../../presentation/pages/admin/TestManagementPage').then(m => ({ default: m.TestManagementPage }))),
      isPrivate: true,
      layout: AdminLayout,
      roles: ['admin'],
      meta: {
        title: 'Test Management',
        description: 'Manage tests and questions'
      }
    },
    {
      path: '/admin/users',
      component: lazy(() => import('../../presentation/pages/admin/UserManagementPage').then(m => ({ default: m.UserManagementPage }))),
      isPrivate: true,
      layout: AdminLayout,
      roles: ['admin'],
      meta: {
        title: 'User Management',
        description: 'Manage users and permissions'
      }
    },

    // Fallback route
    {
      path: '*',
      component: NotFoundPage,
      isPrivate: false,
      layout: DefaultLayout,
      meta: {
        title: 'Page Not Found',
        description: 'The requested page could not be found'
      }
    }
  ], []);
}