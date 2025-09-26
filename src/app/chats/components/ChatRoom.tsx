'use client';

import React, { useState, useEffect, useRef } from 'react';
import MessageCard from './MessageCard';
import MessageInput from './MessageInput';
import { User } from '@/models/user';
import { ActiveChatroom } from '@/models/active-chatroom';
import { messageService } from '@/services/message-service';
import { Message } from '@/models/message';

interface Props {
  user: User;
  selectedChatroom: ActiveChatroom;
}

function ChatRoom({ selectedChatroom }: Props) {
  const { id: chatRoomId, myData: me, otherData: other } = selectedChatroom;

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!chatRoomId) return;

    const unsubscribe = messageService.subscribeMessages(
      chatRoomId,
      setMessages
    );
    return () => unsubscribe();
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    try {
      await messageService.sendMessage(chatRoomId, me.uid, message);
      setMessage('');

      scrollToBottom();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Messages container with overflow and scroll */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-10">
        {messages?.map((message) => (
          <MessageCard
            key={message.id}
            message={message}
            me={me}
            other={other}
          />
        ))}
      </div>

      {/* Input box at the bottom */}
      <MessageInput
        sendMessage={handleSendMessage}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
}

export default ChatRoom;
