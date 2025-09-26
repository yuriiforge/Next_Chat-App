import { useState, useEffect } from 'react';
import { User } from '@/models/user';
import { userService } from '@/services/user-service';

export const useAllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = userService.subscribeAllUsers((allUsers) => {
      setUsers(allUsers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { users, loading };
};
