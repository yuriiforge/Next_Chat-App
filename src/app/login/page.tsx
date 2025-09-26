import React from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from './loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes-config';
import { handleAppError } from '@/utils/handleAppError';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginSchema) => {
    try {
      // TODO perform login
    } catch (error) {
      handleAppError(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-primary p-10 m-2">
      {/*form*/}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-2xl shadow-lg p-10"
      >
        <h1 className="font-secondary text-xl text-center font-semibold text-[#0b3a65ff]">
          CHAT<span className="font-bold text-[#eeab63ff]">2</span>CHAT
        </h1>

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

        {/* Submit button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-block bg-[#0b3a65ff] text-white"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </div>

        <span>
          Don&apos;t have an account?{' '}
          <Link
            href={ROUTES.REGISTER}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default LoginPage;
