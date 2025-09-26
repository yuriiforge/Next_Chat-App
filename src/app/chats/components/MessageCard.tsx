import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Timestamp } from 'firebase/firestore';
import { Message } from '@/models/message';
import { User } from '@/models/user';

dayjs.extend(relativeTime);

interface Props {
  message: Message;
  me: User;
  other: User;
}

function MessageCard({ message, me, other }: Props) {
  const isMessageFromMe = message.sender === me.uid;

  const formatTimeAgo = (timestamp?: Timestamp | null) => {
    if (!timestamp || !(timestamp instanceof Timestamp)) return '';
    return dayjs(timestamp.toDate()).fromNow();
  };

  return (
    <div
      key={message.id}
      className={`flex mb-4 ${
        isMessageFromMe ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Avatar on the left or right based on the sender */}
      <div className={`w-10 h-10 ${isMessageFromMe ? 'ml-2 mr-2' : 'mr-2'}`}>
        {isMessageFromMe && (
          <img
            className="w-full h-full object-cover rounded-full"
            src={me.avatarUrl}
            alt="Avatar"
          />
        )}
        {!isMessageFromMe && (
          <img
            className="w-full h-full object-cover rounded-full"
            src={other.avatarUrl}
            alt="Avatar"
          />
        )}
      </div>

      {/* Message bubble on the right or left based on the sender */}
      <div
        className={` text-white p-2 rounded-md ${
          isMessageFromMe ? 'bg-blue-500 self-end' : 'bg-[#19D39E] self-start'
        }`}
      >
        <p>{message.content}</p>
        <div className="text-xs text-gray-200">
          {formatTimeAgo(message.time as Timestamp)}
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
