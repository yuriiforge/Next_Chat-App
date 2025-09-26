import { DB_NAMES } from '@/enums/db-names';
import { firestore } from '@/lib/firebase-config';
import { User } from '@/models/user';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

type UserProfile = Pick<User, 'uid' | 'name' | 'email' | 'avatarUrl'>;
class UserService {
  private usersCollection = collection(firestore, DB_NAMES.USERS);

  constructor() {}

  async createUser({ uid, name, email, avatarUrl }: UserProfile) {
    try {
      const userRef = doc(firestore, DB_NAMES.USERS, uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        throw new Error('User with this email already exists');
      }

      await setDoc(userRef, {
        name,
        email,
        avatarUrl,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      throw error;
    }
  }

  async getUser(userId: string): Promise<User> {
    try {
      const userRef = doc(firestore, DB_NAMES.USERS, userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        throw new Error('User does not exists');
      }

      const data = userSnap.data();

      return {
        uid: userSnap.id,
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
        createdAt: data.createdAt,
      };
    } catch (err) {
      throw err;
    }
  }

  subscribeAllUsers(callback: (users: User[]) => void) {
    const q = query(this.usersCollection);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(
        (doc) => ({ uid: doc.id, ...doc.data() } as User)
      );
      callback(users);
    });

    return unsubscribe;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const snapshot = await getDocs(this.usersCollection);
      return snapshot.docs.map(
        (doc) => ({ uid: doc.id, ...doc.data() } as User)
      );
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
