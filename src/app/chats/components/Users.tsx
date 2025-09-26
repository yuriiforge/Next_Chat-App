'use client';

import UsersCard from './UsersCard';
import { toast } from 'react-hot-toast';
import { User } from '@/models/user';
import { Chatroom } from '@/models/chat-room';
import { chatroomService } from '@/services/chatroom-service';
import { handleAppError } from '@/utils/handleAppError';
import { authService } from '@/services/auth-service';
import { useAllUsers } from '../hooks/useAllUsers';
import { useUserChatrooms } from '../hooks/useUserChatrooms';
import { Tabs, useTabs } from '../hooks/useTabs';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { ActiveChatroom } from '@/models/active-chatroom';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes-config';
import { serverTimestamp } from 'firebase/firestore';

interface Props {
  userData: User;
  setSelectedChatroom: (chatroom: ActiveChatroom) => void;
}

function Users({ userData, setSelectedChatroom }: Props) {
  const router = useRouter();
  const { users, loading: usersLoading } = useAllUsers();
  const { chatrooms, loading: chatroomsLoading } = useUserChatrooms(userData);
  const { activeTab, handleTabClick, setActiveTab } = useTabs(Tabs.CHATROOMS);

  const createChat = async (otherUser: User) => {
    try {
      const newChatroomData = {
        users: [userData.uid, otherUser.uid],
        usersData: {
          [userData.uid]: {
            name: userData.name,
            avatarUrl: userData.avatarUrl,
          },
          [otherUser.uid]: {
            name: otherUser.name,
            avatarUrl: otherUser.avatarUrl,
          },
        },
        lastMessage: null,
        timestamp: serverTimestamp(),
      };

      const newChatroom = await chatroomService.createChatroom(newChatroomData);

      if (!newChatroom) {
        toast.error('Chatroom already exists for these users.');
        return;
      }

      setActiveTab(Tabs.CHATROOMS);
    } catch (err: unknown) {
      handleAppError(err);
    }
  };

  const openChat = (chatroom: Chatroom) => {
    const otherUserId = chatroom.users.find((id) => id !== userData.uid);
    if (!otherUserId) return;

    setSelectedChatroom({
      id: chatroom.id,
      myData: userData,
      otherData: chatroom.usersData[otherUserId],
    });
  };

  const logoutClick = async () => {
    await authService.logout();
    router.push(ROUTES.LOGIN);
  };

  return (
    <div className="shadow-lg h-screen overflow-auto mt-4 mb-20">
      <div className="flex flex-col lg:flex-row justify-between p-4 space-y-4 lg:space-y-0">
        <button
          className={`btn btn-outline ${
            activeTab === 'users' ? 'btn-primary' : ''
          }`}
          onClick={() => handleTabClick(Tabs.USERS)}
        >
          Users
        </button>
        <button
          className={`btn btn-outline ${
            activeTab === 'chatrooms' ? 'btn-primary' : ''
          }`}
          onClick={() => handleTabClick(Tabs.CHATROOMS)}
        >
          Chatrooms
        </button>
        <button className={`btn btn-outline`} onClick={logoutClick}>
          Logout
        </button>
      </div>

      <div>
        {activeTab === Tabs.CHATROOMS && (
          <>
            <h1 className="px-4 text-base font-semibold">Chatrooms</h1>
            {chatroomsLoading && <LoadingSpinner />}
            {chatrooms.map((chatroom) => {
              const otherUserId = chatroom.users.find(
                (id) => id !== userData.uid
              );
              if (!otherUserId) return null;

              return (
                <div key={chatroom.id} onClick={() => openChat(chatroom)}>
                  <UsersCard
                    name={chatroom.usersData[otherUserId].name}
                    avatarUrl={chatroom.usersData[otherUserId].avatarUrl}
                    latestMessage={chatroom.lastMessage}
                    type="chat"
                  />
                </div>
              );
            })}
          </>
        )}

        {activeTab === Tabs.USERS && (
          <>
            <h1 className="mt-4 px-4 text-base font-semibold">Users</h1>
            {usersLoading && <LoadingSpinner />}
            {users
              .filter((user) => user.uid !== userData.uid)
              .map((user) => (
                <div key={user.uid} onClick={() => createChat(user)}>
                  <UsersCard
                    name={user.name}
                    avatarUrl={user.avatarUrl}
                    latestMessage=""
                    type="user"
                  />
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Users;
