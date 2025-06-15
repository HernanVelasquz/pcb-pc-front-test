import React from 'react';
import type { RouteConfig } from '../../types/routing';

interface LayoutWrapperProps {
  route: RouteConfig;
  children: React.ReactNode;
}

export function LayoutWrapper({ route, children }: LayoutWrapperProps) {
  const Layout = route.layout;

  if (!Layout) {
    return <>{children}</>;
  }

  return <Layout>{children}</Layout>;
}