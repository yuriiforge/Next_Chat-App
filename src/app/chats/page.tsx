'use client';

import ChatRoom from './components/ChatRoom';
import Users from './components/Users';

import Loader from '../components/Loader';
import { useCurrentUser } from './hooks/useCurrentUser';
import { useState } from 'react';
import { ActiveChatroom } from '@/models/active-chatroom';

const ChatsPage = () => {
  const { user, loading } = useCurrentUser();

  const [selectedChatroom, setSelectedChatroom] =
    useState<ActiveChatroom | null>(null);

  if (loading || !user) {
    return <Loader />;
  }
  return (
    <div className="flex h-screen">
      {/* Left side: users list */}
      <div className="flex-shrink-0 w-3/12 border-r border-gray-200">
        <Users userData={user} setSelectedChatroom={setSelectedChatroom} />
      </div>

      {/* Right side: chat room */}
      <div className="flex-grow w-9/12">
        {selectedChatroom ? (
          <ChatRoom user={user} selectedChatroom={selectedChatroom} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-2xl text-gray-400">Select a chatroom</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatsPage;
