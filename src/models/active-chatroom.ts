import { FieldValue, Timestamp } from 'firebase/firestore';
import { User } from './user';

export interface ActiveChatroom {
  id: string;
  myData: User;
  otherData: User;
}

export interface FirestoreChatroom {
  users: string[];
  usersData: Record<
    string,
    {
      name: string;
      email?: string;
      avatarUrl?: string;
    }
  >;
  lastMessage: string | null;
  timestamp?: Timestamp | FieldValue;
}
