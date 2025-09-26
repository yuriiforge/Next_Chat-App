import { DB_NAMES } from '@/enums/db-names';
import { firestore } from '@/lib/firebase-config';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Message } from '@/models/message';

class MessageService {
  private messagesCollection = collection(firestore, DB_NAMES.MESSAGES);

  constructor() {}

  subscribeMessages(
    chatRoomId: string,
    callback: (messages: Message[]) => void
  ): Unsubscribe {
    const q = query(
      this.messagesCollection,
      where('chatRoomId', '==', chatRoomId),
      orderBy('time', 'asc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Message, 'id'>),
        }));
        callback(messages);
      }
    );

    return unsubscribe;
  }

  async sendMessage(
    chatRoomId: string,
    senderId: string,
    content: string
  ): Promise<void> {
    if (!content) return;

    try {
      const newMessage: Omit<Message, 'id'> = {
        chatRoomId,
        sender: senderId,
        content,
        time: serverTimestamp(),
      };

      await addDoc(this.messagesCollection, newMessage);

      const chatroomRef = doc(firestore, DB_NAMES.CHATROOMS, chatRoomId);

      const chatroomSnap = await getDoc(chatroomRef);
      if (chatroomSnap.exists()) {
        await updateDoc(chatroomRef, { lastMessage: content });
      } else {
        console.warn(`Chatroom ${chatRoomId} does not exist!`);
      }
    } catch (error) {
      throw error;
    }
  }
}

export const messageService = new MessageService();
