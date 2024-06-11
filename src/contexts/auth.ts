// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginAuth, checkAuth, api } from '../services/apiService';
import { getToken, setToken, removeToken } from '../utils/storageHelper';

interface AuthContextProps {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const login = async (username: string, password: string) => {
    try {
      const tokens = await loginAuth(username, password);
      setToken('access_token', tokens.access_token);
      setToken('refresh_token', tokens.refresh_token);
      const authUser = await checkAuth(tokens.access_token);
      setUser(authUser.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = () => {
    removeToken('access_token');
    removeToken('refresh_token');
    setUser(null);
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = getToken('refresh_token');
      if (refreshToken) {
        const response = await api.post('/token/refresh/', {
          refresh_token: refreshToken,
        });
        const { access_token } = response.data;
        setToken('access_token', access_token);
        api.defaults.headers['Authorization'] = `Bearer ${access_token}`;
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
      logout();
    }
  };

  useEffect(() => {
    // Check if user is already authenticated
    const accessToken = getToken('access_token');
    if (accessToken) {
      checkAuth(accessToken)
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          refreshAccessToken();
        });
    }
  }, []);

  useEffect(() => {
    // Set interval to refresh token every 10 minutes
    const interval = setInterval(() => {
      refreshAccessToken();
    }, 600000); // 600000 ms = 10 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
