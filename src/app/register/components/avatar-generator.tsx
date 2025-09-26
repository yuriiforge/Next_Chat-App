'use client';

import Image from 'next/image';
import { useAvatar } from '../hooks/useAvatar';

const AvatarCreate = () => {
  const { avatarUrl, refreshAvatar } = useAvatar();

  return (
    <div className="flex items-center justify-between border border-gray-200 p-2">
      <Image
        src={avatarUrl || '/next.svg'}
        alt="Avatar"
        width={80}
        height={80}
        className="rounded-full"
        unoptimized
      />
      <button type="button" className="btn btn-outline" onClick={refreshAvatar}>
        New Avatar
      </button>
    </div>
  );
};

export default AvatarCreate;
