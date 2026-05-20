import api from './api';
import type { User } from '../types/user';

interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  accessToken: string;
  user: User;
}

interface UserResponse {
  success: boolean;
  user: User;
}

export const authService = {
  signup: (data: SignupRequest) => api.post<UserResponse>('/auth/signup', data),
  login: (data: LoginRequest) => api.post<LoginResponse>('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get<UserResponse>('/auth/me'),
};
