import { DB_NAMES } from '@/enums/db-names';
import { firestore } from '@/lib/firebase-config';
import { FirestoreChatroom } from '@/models/active-chatroom';
import { Chatroom } from '@/models/chat-room';
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

class ChatroomService {
  private chatroomsCollection = collection(firestore, DB_NAMES.CHATROOMS);

  constructor() {}

  subscribeUserChatrooms(
    userId: string,
    callback: (chatrooms: Chatroom[]) => void
  ) {
    const chatroomsQuery = query(
      this.chatroomsCollection,
      where('users', 'array-contains', userId)
    );

    const unsubscribe = onSnapshot(chatroomsQuery, (snapshot) => {
      try {
        const chatrooms = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Chatroom)
        );
        callback(chatrooms);
      } catch (error) {
        console.error('Error processing chatrooms snapshot:', error);
      }
    });

    return unsubscribe;
  }

  async createChatroom(chatroomData: FirestoreChatroom) {
    const q = query(
      collection(firestore, 'chatrooms'),
      where('users', 'array-contains', chatroomData.users[0])
    );

    const snapshot = await getDocs(q);

    const exists = snapshot.docs.some((doc) => {
      const users: string[] = doc.data().users;
      return users.includes(chatroomData.users[1]);
    });

    if (exists) return null;

    const docRef = await addDoc(this.chatroomsCollection, chatroomData);
    return { id: docRef.id, ...chatroomData };
  }
}

export const chatroomService = new ChatroomService();
