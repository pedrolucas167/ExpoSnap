export interface User {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};
