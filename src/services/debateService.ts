import api from './api';
import type { Debate, DebateMessage } from '../types/debate';

export interface CreateDebateRequest {
  title: string;
  description: string;
  debateType: 'FREE' | 'CONSENSUS' | 'PROS_CONS';
  tags?: string[];
  closeConditionType?: 'TIME_LIMIT' | 'MANUAL' | 'TARGET_REACHED';
  closeAt?: string;
}

export interface ListDebatesParams {
  keyword?: string;
  tag?: string;
  type?: 'FREE' | 'CONSENSUS' | 'PROS_CONS';
  status?: 'OPEN' | 'CLOSED' | 'ARCHIVED';
  page?: number;
  limit?: number;
  sort?: 'createdAt' | 'archivedAt' | 'updatedAt';
  direction?: 'asc' | 'desc';
}

interface DebateListResponse {
  success: boolean;
  debates: Debate[];
  page: number;
  limit: number;
  totalCount: number;
}

interface DebateDetailResponse {
  success: boolean;
  debate: Debate;
}

interface DebatePostsResponse {
  success: boolean;
  posts: DebateMessage[];
  page: number;
  limit: number;
  totalCount: number;
}

export const debateService = {
  getList: (params?: ListDebatesParams) => api.get<DebateListResponse>('/debates', { params }),
  getById: (id: string) => api.get<DebateDetailResponse>(`/debates/${id}`),
  create: (data: CreateDebateRequest) => api.post<DebateDetailResponse>('/debates', data),
  getMessages: (id: string) => api.get<DebatePostsResponse>(`/debates/${id}/posts`),
  getArchived: (params?: Omit<ListDebatesParams, 'status'>) =>
    api.get<DebateListResponse>('/debates/archive', { params }),
};
