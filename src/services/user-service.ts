import { DB_NAMES } from '@/enums/db-names';
import { firestore } from '@/lib/firebase-config';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

interface UserProfile {
  uid: string;
  name: string;
  email: string;
}

class UserService {
  constructor() {}

  async createUser({ uid, name, email }: UserProfile) {
    try {
      const userRef = doc(firestore, DB_NAMES.USERS, uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        throw new Error('User with this email already exists');
      }

      await setDoc(userRef, {
        name,
        email,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
