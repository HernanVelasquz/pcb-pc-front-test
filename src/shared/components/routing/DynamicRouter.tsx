import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteGuard } from './RouteGuard';
import { LayoutWrapper } from './LayoutWrapper';
import { LoadingSpinner } from '../ui/LoadingSpinner/LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';
import type { RouteConfig } from '../../types/routing';

interface DynamicRouterProps {
  routes: RouteConfig[];
  fallbackComponent?: React.ComponentType;
  loadingComponent?: React.ComponentType;
}

export const DynamicRouter = ({ 
  routes, 
  fallbackComponent: FallbackComponent,
  loadingComponent: LoadingComponent = () => (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  )
}: DynamicRouterProps) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          {routes.map((route, index) => {
            const Component = route.component;
            
            return (
              <Route
                key={`${route.path}-${index}`}
                path={route.path}
                element={
                  <RouteGuard route={route}>
                    <LayoutWrapper route={route}>
                      <Component />
                    </LayoutWrapper>
                  </RouteGuard>
                }
              />
            );
          })}
          
          {/* Fallback route */}
          {FallbackComponent && (
            <Route path="*" element={<FallbackComponent />} />
          )}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}