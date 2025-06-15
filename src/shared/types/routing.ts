export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  isPrivate?: boolean;
  layout?: React.ComponentType<{ children: React.ReactNode }>;
  roles?: string[];
  exact?: boolean;
  redirect?: string;
  meta?: {
    title?: string;
    description?: string;
    requiresAuth?: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  permissions?: string[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}