import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import authservice from '../appwrite/auth';
import Input from './input';
import Button from './button';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/features/authslice';
import { useDispatch } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '', name: '' },
  });

  const submit = async (data) => {
    setError(null);
    try {
      const userData = await authservice.createAccount(data);
      if (userData) {
        const currentUser = await authservice.getCurrentUser();
        if (currentUser) {
          dispatch(login({currentUser}));
        }
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Sign Up</h1>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-gray-900 hover:underline">
              Login
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div>
            <Input
              {...register('name', { required: 'Name is required' })}
              placeholder="Name"
              label="Name"
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              placeholder="Email"
              label="Email"
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Input
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              placeholder="Password"
              label="Password"
              type="password"
            />
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;