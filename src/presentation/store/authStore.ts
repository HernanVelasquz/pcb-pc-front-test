import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../../domain/entities/User';
import type { LoginCredentials } from '../../domain/repositories/IAuthRepository';
import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase';
import { LogoutUseCase } from '../../application/use-cases/auth/LogoutUseCase';
import { MockAuthRepository } from '../../infrastructure/repositories/MockAuthRepository';

const authRepository = new MockAuthRepository();
const loginUseCase = new LoginUseCase(authRepository);
const logoutUseCase = new LogoutUseCase(authRepository);

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const result = await loginUseCase.execute(credentials);
          
          // Mock user roles based on email for demo purposes
          const userWithRoles = {
            ...result.user,
            roles: credentials.email.includes('admin') ? ['admin'] : ['student']
          };

          set({
            token: result.token,
            user: userWithRoles,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutUseCase.execute();
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      hasRole: (role: string) => {
        const { user } = get();
        return user?.roles?.includes(role) ?? false;
      },

      hasAnyRole: (roles: string[]) => {
        const { user } = get();
        return roles.some(role => user?.roles?.includes(role)) ?? false;
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);