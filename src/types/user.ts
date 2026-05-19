export interface User {
  id: string;
  nickname: string;
  email: string;
  profileImage?: string | null;
  role?: 'USER' | 'ADMIN';
  status?: 'ACTIVE' | 'SUSPENDED' | 'DELETED';
  createdAt?: string;
}
