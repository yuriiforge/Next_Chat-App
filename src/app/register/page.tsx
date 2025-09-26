'use client';

import { useForm } from 'react-hook-form';
import { registerSchema, RegisterSchema } from './register-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleAppError } from '@/utils/handleAppError';
import AuthFormWrapper from '../components/AuthFormWrapper';

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
    <AuthFormWrapper
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      authFormType="register"
    >
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
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </div>
    </AuthFormWrapper>
  );
};

export default RegisterPage;
