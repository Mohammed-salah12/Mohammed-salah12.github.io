import { createContext, useMemo, useState } from 'react';

import { adminService } from '../services/api';

export const AuthContext = createContext(null);

function getStoredAdminState() {
  const token = localStorage.getItem('admin_token');
  const admin = localStorage.getItem('admin_user');

  return {
    token: token || '',
    admin: admin ? JSON.parse(admin) : null,
  };
}

export function AuthProvider({ children }) {
  const [{ token, admin }, setAuthState] = useState(getStoredAdminState);

  const login = async (credentials) => {
    const response = await adminService.login(credentials);
    localStorage.setItem('admin_token', response.token);
    localStorage.setItem('admin_user', JSON.stringify(response.admin));

    setAuthState({
      token: response.token,
      admin: response.admin,
    });

    return response;
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');

    setAuthState({
      token: '',
      admin: null,
    });
  };

  const value = useMemo(
    () => ({
      token,
      admin,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [admin, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
