import { useState, useEffect } from 'react';
import { Chatroom } from '@/models/chat-room';
import { chatroomService } from '@/services/chatroom-service';
import { User } from '@/models/user';

export const useUserChatrooms = (user: User | null) => {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const unsubscribe = chatroomService.subscribeUserChatrooms(
      user.uid,
      (chatrooms) => {
        setChatrooms(chatrooms);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { chatrooms, loading };
};
