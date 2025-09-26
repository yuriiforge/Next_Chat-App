'use client';

import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from '@/lib/firebase-config';
import { User } from '@/models/user';
import { userService } from '@/services/user-service';
import { ROUTES } from '@/lib/routes-config';

export const useCurrentUser = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        router.push(ROUTES.LOGIN);
        return;
      }

      try {
        const userData = await userService.getUser(firebaseUser.uid);

        if (userData) {
          setUser(userData);
        } else {
          console.warn('No document for user:', firebaseUser.uid);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return { user, loading };
};
