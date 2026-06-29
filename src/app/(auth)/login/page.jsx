'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

const LogInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginFunc = async data => {
    setLoading(true);
    try {
      const { data: res, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: '/',
      });

      if (error) {
        toast.error(error.message || 'Login failed!');
      } else {
        toast.success('Successfully Logged In!');
        router.push('/');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <div className="min-h-screen bg-[#050211] flex justify-center items-center p-4 relative overflow-hidden">
      {/* background  */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full"></div>

      <div className="p-8 sm:p-12 rounded-[32px] bg-[#120D26]/60 backdrop-blur-xl border border-white/5 shadow-2xl w-full max-w-md transition-all duration-300 hover:border-purple-500/30 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black mb-3 text-white tracking-tight">
            Welcome{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
              Back
            </span>
          </h2>
          <p className="text-gray-400 text-sm font-medium opacity-80">
            Sign in to continue your pet adoption journey
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit(handleLoginFunc)}>
          {/* Email field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <input
              type="email"
              className={`w-full px-5 py-4 rounded-2xl bg-white/5 border outline-none transition-all text-white placeholder:text-gray-600 ${
                errors.email
                  ? 'border-red-500 bg-red-500/5'
                  : 'border-white/10 focus:border-[#C084FC] focus:ring-2 focus:ring-[#C084FC]/20'
              }`}
              placeholder="name@example.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <span className="text-red-400 text-xs ml-1 font-bold">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={isShowPassword ? 'text' : 'password'}
                className={`w-full px-5 py-4 rounded-2xl bg-white/5 border outline-none transition-all text-white placeholder:text-gray-600 ${
                  errors.password
                    ? 'border-red-500 bg-red-500/5'
                    : 'border-white/10 focus:border-[#C084FC] focus:ring-2 focus:ring-[#C084FC]/20'
                }`}
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C084FC] transition-colors"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-400 text-xs ml-1 font-bold">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Login Button */}
          <button
            disabled={loading}
            className={`w-full py-4.5 h-14 rounded-2xl text-white font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${
              loading
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#F27121] via-[#E94057] to-[#8A2387] shadow-pink-500/20 hover:shadow-pink-500/40'
            }`}
          >
            {loading ? <PulseLoader size={10} color="#fff" /> : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm font-bold uppercase tracking-tighter">
            <span className="px-4 bg-[#120D26] text-gray-500 italic">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center gap-3 px-5 py-4 border border-white/10 rounded-2xl font-bold text-gray-300 bg-white/5 hover:bg-white/10 hover:border-[#C084FC]/30 transition-all active:scale-95 shadow-sm"
        >
          <FcGoogle size={24} />
          <span>Google Account</span>
        </button>

        {/* Footer Link */}
        <p className="mt-10 text-center text-sm text-gray-500 font-bold">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-[#C084FC] hover:text-[#E879F9] underline underline-offset-8 transition-colors"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
