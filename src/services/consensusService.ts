import api from './api';
import type { Consensus, ConsensusVote, ConsensusVoteType } from '../types/debate';

export interface CreateSelectionConsensusRequest {
  title: string;
  content: string;
}

interface CreateConsensusResponse {
  success: boolean;
  consensus: Consensus;
}

export interface VoteConsensusRequest {
  voteType: ConsensusVoteType;
  comment?: string;
}

interface VoteConsensusResponse {
  success: boolean;
  vote: ConsensusVote;
}

export const consensusService = {
  createFromSelectionTarget: (selectionTargetId: string, data: CreateSelectionConsensusRequest) =>
    api.post<CreateConsensusResponse>(`/selection-targets/${selectionTargetId}/consensuses`, data),
  vote: (consensusId: string, data: VoteConsensusRequest) =>
    api.post<VoteConsensusResponse>(`/consensuses/${consensusId}/votes`, data),
};
