import type { IAuthRepository, LoginCredentials, AuthResult } from '../../domain/repositories/IAuthRepository';
import type { User } from '../../domain/entities/User';
import { UserEntity } from '../../domain/entities/User';

export class MockAuthRepository implements IAuthRepository {
  private currentUser: User | null = null;
  private token: string | null = null;

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    // Simulate API delay
    await this.delay(1000);

    // Mock authentication - in real app, this would call an API
    const mockUser = UserEntity.create({
      email: credentials.email,
      name: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      roles: []
    });

    const mockToken = 'mock.jwt.token.' + Date.now();

    this.currentUser = mockUser;
    this.token = mockToken;

    return {
      token: mockToken,
      user: mockUser
    };
  }

  async logout(): Promise<void> {
    await this.delay(500);
    this.currentUser = null;
    this.token = null;
  }

  async getCurrentUser(): Promise<User | null> {
    return this.currentUser;
  }

  async refreshToken(): Promise<string> {
    if (!this.token) {
      throw new Error('No token to refresh');
    }
    
    await this.delay(500);
    this.token = 'refreshed.jwt.token.' + Date.now();
    return this.token;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}