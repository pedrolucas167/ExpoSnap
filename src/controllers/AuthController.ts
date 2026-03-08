import { useState, useCallback } from 'react';
import { AuthState, initialAuthState, User } from '../models/UserModel';

export function useAuthController() {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  const login = useCallback(async (email: string, password: string, rememberMe: boolean) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Email inválido.');
      }

      if (password.length < 4) {
        throw new Error('Senha deve ter pelo menos 4 caracteres.');
      }

      const user: User = { email, password, rememberMe };

      setAuthState({
        isAuthenticated: true,
        user,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Erro ao fazer login.',
      }));
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState(initialAuthState);
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    authState,
    login,
    logout,
    clearError,
  };
}
