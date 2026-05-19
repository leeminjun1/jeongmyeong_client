import { useCallback } from 'react';
import { useDebateStore } from '../stores/debateStore';
import { debateService } from '../services/debateService';
import type { CreateDebateRequest, ListDebatesParams } from '../services/debateService';

export const useDebate = () => {
  const { debates, currentDebate, messages, setDebates, setCurrentDebate, setMessages, addMessage } =
    useDebateStore();

  const fetchDebates = useCallback(async (params?: ListDebatesParams) => {
    const { data } = await debateService.getList(params);
    setDebates(data.debates);
  }, [setDebates]);

  const fetchArchivedDebates = useCallback(async (params?: Omit<ListDebatesParams, 'status'>) => {
    const { data } = await debateService.getArchived(params);
    setDebates(data.debates);
  }, [setDebates]);

  const fetchDebate = useCallback(async (id: string) => {
    const { data } = await debateService.getById(id);
    setCurrentDebate(data.debate);
  }, [setCurrentDebate]);

  const fetchMessages = useCallback(async (id: string) => {
    const { data } = await debateService.getMessages(id);
    setMessages(data.posts);
  }, [setMessages]);

  const createDebate = useCallback(async (payload: CreateDebateRequest) => {
    const { data } = await debateService.create(payload);
    return data.debate;
  }, []);

  return {
    debates,
    currentDebate,
    messages,
    fetchDebates,
    fetchArchivedDebates,
    fetchDebate,
    fetchMessages,
    createDebate,
    addMessage,
  };
};
