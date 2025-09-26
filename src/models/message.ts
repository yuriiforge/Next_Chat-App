import { FieldValue, Timestamp } from 'firebase/firestore';

export interface Message {
  id: string;
  chatRoomId: string;
  content: string;
  sender: string;
  image?: string;
  time: Timestamp | FieldValue;
}
