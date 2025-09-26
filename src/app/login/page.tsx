'use client';

import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from './loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleAppError } from '@/utils/handleAppError';
import AuthFormWrapper from '../components/AuthFormWrapper';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase-config';

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('User logged in successfully!');

      router.push(ROUTES.CHATS);
    } catch (error) {
      handleAppError(error);
    }
  };

  return (
    <AuthFormWrapper
      authFormType="login"
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    >
      {/* Email */}
      <div>
        <label className="label">
          <span className="text-base label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="Email"
          className="w-full input input-bordered"
          {...register('email')}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="label">
          <span className="text-base label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full input input-bordered"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
    </AuthFormWrapper>
  );
};

export default LoginPage;
