'use client';

import { useForm } from 'react-hook-form';
import { registerSchema, RegisterSchema } from './register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes-config';
import AvatarCreate from './components/avatar-generator';
import { handleAppError } from '@/utils/handleAppError';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      //TODO perform HTTP request
    } catch (error) {
      handleAppError(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-primary p-10 m-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-2xl shadow-lg p-10"
      >
        <h1 className="font-secondary text-xl text-center font-semibold text-[#0b3a65ff]">
          CHAT<span className="font-bold text-[#eeab63ff]">2</span>CHAT
        </h1>

        <AvatarCreate />

        <div>
          <label className="label">
            <span className="text-base label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Name"
            className="w-full input input-bordered"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="text-base label-text">Email</span>
          </label>
          <input
            type="email"
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

        {/* Confirm Password */}
        <div>
          <label className="label">
            <span className="text-base label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full input input-bordered"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="btn btn-block bg-[#0b3a65ff] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Sign Up'
            )}
          </button>
        </div>

        <span>
          Already have an account?{' '}
          <Link
            href={ROUTES.LOGIN}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterPage;
