"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    const { data: res, error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
              callbackURL: callbackUrl,

    });

    console.log("LOGIN ERROR:", error);
    console.log("LOGIN DATA:", res);

    if (error) {
      toast.error(
        "Wrong Attempt! Please try again: " + (error.message || ""),
        {
          position: "top-center",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }
      );

      return;
    }

    toast.success("You are successfully Logged In", {
      position: "top-center",
      duration: 2000,
      style: {
        background: "#363636",
        color: "#fff",
      },
    });

    // Wait for cookie/session to be stored
    setTimeout(() => {
      window.location.href = callbackUrl;
    }, 300);
  };

  const handleGoogleLogin = async () => {
    try {
       const Googledata = await authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });

  
      console.log("Google Login Data" , Googledata);

    } catch (error) {
      console.error("Google login error:", error);

      toast.error("Something went wrong with Google login", {
        position: "top-center",
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-gray-300 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl">
        
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground">
            Welcome Back
          </h1>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Sign in to continue to IdeaVault.
          </p>
        </div>

        <div className="flex gap-3 mb-5">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 py-2.5 text-sm font-medium text-foreground transition-colors cursor-pointer"
          >
            <FaGoogle size={15} />
            Google
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />

          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            or sign in with email
          </span>

          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Email Address
            </label>

            <input
              type="email"
              placeholder="sarah@example.com"
              className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 px-4 py-2.5 text-sm text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60 px-4 py-2.5 pr-11 text-sm text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-foreground cursor-pointer"
              >
                {showPassword ? (
                  <FaEye size={15} />
                ) : (
                  <FaEyeSlash size={15} />
                )}
              </button>
            </div>

            <div className="flex justify-end mt-[2px]">
              <Link
                href="/forgot-password"
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 w-full rounded-lg bg-amber-600 hover:bg-amber-500 py-2.5 text-sm font-semibold text-white disabled:opacity-60 transition-colors cursor-pointer"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Don&apos;t have an account?{" "}

          <Link
            href="/signup"
            className="font-medium text-amber-600 dark:text-amber-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;