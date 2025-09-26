import { ENVIRONMENTS } from '@/enums/env';
import toast from 'react-hot-toast';

export const handleAppError = (
  error: unknown,
  fallbackMessage = 'Something went wrong'
) => {
  if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
    console.error(error);
  }

  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
      ? error
      : fallbackMessage;

  toast.error(message);
};
