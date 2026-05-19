export interface Message {
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

export interface ChatRoom {
  id: string;
  title: string;
  description: string;
  debateType: 'FREE' | 'CONSENSUS' | 'PROS_CONS';
  status: 'OPEN' | 'CLOSED' | 'ARCHIVED';
  createdAt: string;
}
