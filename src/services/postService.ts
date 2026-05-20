import api from './api';
import type {
  Comment,
  CommentSelection,
  DeletedPost,
  SelectionTarget,
  UpdatedPost,
} from '../types/debate';

export interface UpdatePostRequest {
  content: string;
}

interface UpdatePostResponse {
  success: boolean;
  post: UpdatedPost;
}

interface DeletePostResponse {
  success: boolean;
  post: DeletedPost;
}

interface CommentListResponse {
  success: boolean;
  comments: Comment[];
}

export interface CreateCommentRequest {
  content: string;
  parentCommentId?: string;
  selection?: CommentSelection;
}

interface CreateCommentResponse {
  success: boolean;
  comment: Comment;
  selectionTarget: Pick<SelectionTarget, 'id'> | null;
}

export const postService = {
  update: (postId: string, data: UpdatePostRequest) =>
    api.patch<UpdatePostResponse>(`/posts/${postId}`, data),
  delete: (postId: string) => api.delete<DeletePostResponse>(`/posts/${postId}`),
  getComments: (postId: string) => api.get<CommentListResponse>(`/posts/${postId}/comments`),
  createComment: (postId: string, data: CreateCommentRequest) =>
    api.post<CreateCommentResponse>(`/posts/${postId}/comments`, data),
};
