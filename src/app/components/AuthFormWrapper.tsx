import { ROUTES } from '@/lib/routes-config';
import Link from 'next/link';
import { ReactNode } from 'react';
import AvatarCreate from '../register/components/avatar-generator';
import { SubmitHandler } from 'react-hook-form';

interface Props<T> {
  authFormType: 'login' | 'register';
  isSubmitting: boolean;
  handleSubmit: (
    onValid: SubmitHandler<T>
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
}

const AuthFormWrapper = <T,>({
  authFormType,
  isSubmitting,
  handleSubmit,
  onSubmit,
  children,
}: Props<T>) => {
  return (
    <div className="flex justify-center items-center h-screen font-primary p-10 m-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-2xl shadow-lg p-10"
      >
        <h1 className="font-secondary text-xl text-center font-semibold text-[#0b3a65ff]">
          CHAT<span className="font-bold text-[#eeab63ff]">2</span>CHAT
        </h1>
        {authFormType === 'register' && <AvatarCreate />}

        {children}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-block bg-[#0b3a65ff] text-white"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : authFormType === 'login' ? (
              'Log in'
            ) : (
              'Sign in'
            )}
          </button>
        </div>

        {authFormType === 'login' ? (
          <span>
            Don&apos;t have an account?{' '}
            <Link
              href={ROUTES.REGISTER}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Register
            </Link>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <Link
              href={ROUTES.LOGIN}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Login
            </Link>
          </span>
        )}
      </form>
    </div>
  );
};

export default AuthFormWrapper;
