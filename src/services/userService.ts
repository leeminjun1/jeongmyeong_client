import api from './api';
import type { User } from '../types/user';

export interface UpdateMeRequest {
  nickname?: string;
  profileImage?: string;
}

interface UserResponse {
  success: boolean;
  user: User;
}

export const userService = {
  updateMe: (data: UpdateMeRequest) => api.patch<UserResponse>('/users/me', data),
  getPublicProfile: (userId: string) => api.get<UserResponse>(`/users/${userId}`),
};
