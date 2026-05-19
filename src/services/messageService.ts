import api from './api';
import type { ChatRoom, Message } from '../types/message';

interface DebateListResponse {
  success: boolean;
  debates: ChatRoom[];
  page: number;
  limit: number;
  totalCount: number;
}

interface DebatePostsResponse {
  success: boolean;
  posts: Message[];
  page: number;
  limit: number;
  totalCount: number;
}

interface CreatePostResponse {
  success: boolean;
  post: {
    id: string;
    debateId: string;
    authorId: string;
    content: string;
    status: 'VISIBLE' | 'HIDDEN' | 'DELETED';
    createdAt: string;
  };
}

export const messageService = {
  getChatRooms: () =>
    api.get<DebateListResponse>('/debates', {
      params: {
        status: 'OPEN',
        sort: 'updatedAt',
        direction: 'desc',
        limit: 20,
      },
    }),
  getMessages: (roomId: string) =>
    api.get<DebatePostsResponse>(`/debates/${roomId}/posts`, {
      params: {
        page: 1,
        limit: 100,
      },
    }),
  sendMessage: (roomId: string, content: string) =>
    api.post<CreatePostResponse>(`/debates/${roomId}/posts`, { content }),
};
