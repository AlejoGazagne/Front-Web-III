export const formatRoles = (roles: string[]): string => {
  const roleMapping: Record<string, string> = {
    ROLE_ADMIN: 'Administrador',
    ROLE_OPERATOR: 'Operario',
  };
  
  return roles.map(role => roleMapping[role] || role).join(', ');
};