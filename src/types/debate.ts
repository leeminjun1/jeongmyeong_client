export type DebateType = 'FREE' | 'CONSENSUS' | 'PROS_CONS';
export type DebateStatus = 'OPEN' | 'CLOSED' | 'ARCHIVED';

export interface DebateTag {
  id: string;
  name: string;
}

export interface Debate {
  id: string;
  title: string;
  description: string;
  debateType: DebateType;
  status: DebateStatus;
  createdAt: string;
  archivedAt?: string | null;
  tagMaps?: Array<{ tag: DebateTag }>;
  creator?: {
    id: string;
    nickname: string;
  };
}

export interface DebateMessage {
  id: string;
  debateId: string;
  content: string;
  status: 'VISIBLE' | 'HIDDEN' | 'DELETED';
  createdAt: string;
  updatedAt?: string;
  author: {
    id: string;
    nickname: string;
    profileImage?: string | null;
  };
}
