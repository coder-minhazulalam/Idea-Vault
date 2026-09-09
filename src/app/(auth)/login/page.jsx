"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
// import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log("Login:", { email, password });
    
    //   Authentication - login
            
    //         const { data : res , error } = await authClient.signIn.email({
    //         email: email,
    //         password: password,
    //         rememberMe: true,
    //         callbackURL: "/",
    //     });

    //     console.log("LOGIN ERROR:", error);
    //     console.log("LOGIN DATA:", res);
            
    //       if (error) {
    //         alert("Wrong Attempt! Please try again");
    //         return;
    //       }

    // if (res) {
    //   alert("You are successfully Login");
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f0f13] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-[#1a1a24] border border-white/10 p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Sign in to continue to IdeaVault.
          </p>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-3 mb-5">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <FaGoogle size={15} />
            Google
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          >
            <FaGithub size={15} />
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-zinc-500">or sign in with email</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-sm text-zinc-300">Email Address</label>
            <input
              type="email"
              placeholder="sarah@example.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-sm text-zinc-300">Password</label>
              <Link href="/forgot-password" className="text-xs text-violet-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 pr-11 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-colors"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEye size={15} /> : <FaEyeSlash size={15} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 w-full rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 disabled:opacity-60 transition-colors"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 text-center text-sm text-zinc-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-violet-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
