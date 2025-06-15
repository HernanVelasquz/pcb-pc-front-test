import type { IAuthRepository, LoginCredentials, AuthResult } from '../../../domain/repositories/IAuthRepository';

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<AuthResult> {
    this.validateCredentials(credentials);
    return await this.authRepository.login(credentials);
  }

  private validateCredentials(credentials: LoginCredentials): void {
    if (!credentials.email || !this.isValidEmail(credentials.email)) {
      throw new Error('Please enter a valid email address');
    }

    if (!credentials.password || credentials.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}