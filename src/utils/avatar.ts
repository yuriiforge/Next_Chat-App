import { AvatarGenerator } from 'random-avatar-generator';

const generator = new AvatarGenerator();

export function createAvatar(): string {
  return generator.generateRandomAvatar();
}
