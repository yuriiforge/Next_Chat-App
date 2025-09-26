import { User } from './user';

export interface Chatroom {
  id: string;
  users: string[];
  usersData: Record<string, User>;
  lastMessage: string | null;
  timestamp?: Date | null;
}
