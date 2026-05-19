import { useMessageStore } from '../stores/messageStore';
import { messageService } from '../services/messageService';

export const useMessage = () => {
  const { chatRooms, currentMessages, setChatRooms, setCurrentMessages } = useMessageStore();

  const fetchChatRooms = async () => {
    const { data } = await messageService.getChatRooms();
    setChatRooms(data.debates);
  };

  const fetchMessages = async (roomId: string) => {
    const { data } = await messageService.getMessages(roomId);
    setCurrentMessages(data.posts);
  };

  const sendMessage = async (roomId: string, content: string) => {
    await messageService.sendMessage(roomId, content);
    await fetchMessages(roomId);
  };

  return { chatRooms, currentMessages, fetchChatRooms, fetchMessages, sendMessage };
};
