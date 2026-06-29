'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { authClient } from '@/lib/auth-client';
import { PulseLoader } from 'react-spinners';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const handleRegisterFunc = async data => {
    setLoading(true);
    try {
      const { name, email, password, image } = data;
      const { data: res, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (error) {
        toast.error(error.message || 'Registration failed!');
      } else {
        toast.success('Account created successfully!');
        router.push('/login');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  return (
    <div className="min-h-screen bg-[#050211] flex justify-center items-center py-12 px-4 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full"></div>

      <div className="p-8 sm:p-10 rounded-[40px] bg-[#120D26]/60 backdrop-blur-xl border border-white/5 shadow-2xl w-full max-w-lg transition-all duration-300 hover:border-purple-500/20 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black mb-3 text-white">
            Create{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
              Account
            </span>
          </h2>
          <p className="text-gray-400 text-sm font-medium opacity-80">
            Join our pet adoption community today
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegisterFunc)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <input
                type="text"
                className={`w-full px-5 py-3.5 rounded-2xl bg-white/5 border outline-none transition-all text-white placeholder:text-gray-600 ${errors.name ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-[#C084FC]'}`}
                placeholder="John Doe"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <span className="text-red-400 text-[10px] ml-1 font-bold">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <input
                type="email"
                className={`w-full px-5 py-3.5 rounded-2xl bg-white/5 border outline-none transition-all text-white placeholder:text-gray-600 ${errors.email ? 'border-red-500 bg-red-500/5' : 'border-white/10 focus:border-[#C084FC]'}`}
                placeholder="name@example.com"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <span className="text-red-400 text-[10px] ml-1 font-bold">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Photo URL Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
              Photo URL (Optional)
            </label>
            <input
              type="text"
              className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 outline-none text-white focus:border-[#C084FC] transition-all placeholder:text-gray-600"
              placeholder="https://image-link.com"
              {...register('image')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-white/5 border outline-none transition-all text-white placeholder:text-gray-600 ${errors.password ? 'border-red-500' : 'border-white/10 focus:border-[#C084FC]'}`}
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Min 6 characters' },
                    validate: v =>
                      (/[A-Z]/.test(v) && /[a-z]/.test(v)) ||
                      'At least one uppercase and one lowercase letter',
                  })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 text-[10px] ml-1 font-bold">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Confirm
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`w-full px-5 py-3.5 rounded-2xl bg-white/5 border outline-none transition-all text-white placeholder:text-gray-600 ${errors.confirmPassword ? 'border-red-500' : 'border-white/10 focus:border-[#C084FC]'}`}
                  placeholder="••••••••"
                  {...register('confirmPassword', {
                    required: 'Required',
                    // watch er maddhome sob datar copy rakha ase ekhon confirm password er valu jodi password er value er sathe match kore tobe thik ase noyto No Mathc dibe
                    validate: value => value === password || 'No match',
                  })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-400 text-[10px] ml-1 font-bold">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          {/* Register Button */}
          <button
            disabled={loading}
            type="submit"
            className={`w-full py-4 rounded-2xl text-white font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 ${loading ? 'bg-gray-700' : 'bg-gradient-to-r from-[#F27121] via-[#E94057] to-[#8A2387] shadow-pink-500/20 hover:shadow-pink-500/40'}`}
          >
            {loading ? (
              <PulseLoader size={10} color="#fff" />
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
            <span className="px-4 bg-[#120D26] text-gray-500 italic">
              Or register with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center gap-3 px-5 py-3.5 border border-white/10 rounded-2xl font-bold text-gray-300 bg-white/5 hover:bg-white/10 transition-all active:scale-95"
        >
          <FcGoogle size={22} />
          <span>Google Account</span>
        </button>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-500 font-bold">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-[#C084FC] hover:text-[#E879F9] underline underline-offset-8 transition-colors"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
