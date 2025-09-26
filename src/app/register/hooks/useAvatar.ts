import { useEffect, useState, useCallback } from 'react';
import { AvatarGenerator } from 'random-avatar-generator';

export const useAvatar = () => {
  const [avatarUrl, setAvatarUrl] = useState('');

  const generateRandomAvatar = useCallback(() => {
    const generator = new AvatarGenerator();
    return generator.generateRandomAvatar();
  }, []);

  const refreshAvatar = useCallback(() => {
    setAvatarUrl(generateRandomAvatar());
  }, [generateRandomAvatar]);

  useEffect(() => {
    refreshAvatar();
  }, [refreshAvatar]);

  return { avatarUrl, refreshAvatar };
};
