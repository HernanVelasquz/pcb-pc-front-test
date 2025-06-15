export interface User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly avatar?: string;
  readonly roles: string[];
  readonly permissions?: string[];
}

export class UserEntity implements User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly roles: string[] = ['student'],
    public readonly avatar?: string,
    public readonly permissions?: string[]
  ) {}

  static create(data: Omit<User, 'id'>): UserEntity {
    return new UserEntity(
      crypto.randomUUID(),
      data.email,
      data.name,
      data.roles || ['student'],
      data.avatar,
      data.permissions
    );
  }

  updateProfile(name: string, avatar?: string): UserEntity {
    return new UserEntity(this.id, this.email, name, this.roles, avatar, this.permissions);
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.roles.includes(role));
  }

  hasPermission(permission: string): boolean {
    return this.permissions?.includes(permission) ?? false;
  }
}