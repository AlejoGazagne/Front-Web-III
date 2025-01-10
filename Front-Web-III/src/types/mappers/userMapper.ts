import type { UserData } from '@/types/user';

export function mapUserFromResponse(user: any): UserData {
  return {
    id: user.id,
    name: user.username,
    mail: user.email,
    roles: user.roles,
    enabled: false
  };
}