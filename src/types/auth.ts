export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Session {
  userId: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: Session;
}
