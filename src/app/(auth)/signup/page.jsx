"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

const SignupPage = () => {
  const router = useRouter();
  //  Password visiblity

  const [showPassword, setshowPassword] = useState(false);

  // REACT HOOK ----------------------------->
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSubmitForm = async (DATA) => {
    const { name, url, email, password } = DATA;
    console.log({ name, url, email, password });

    // Authentication

    const { data, error } = await authClient.signUp.email({
      name: name,
      image: url,
      email: email,
      password: password,
      callbackURL: "/",
    });

    console.log("Register ERROR:", error);
    console.log("Register DATA:", data);

    if (error) {
      alert("Wrong Attempt! Please try again: " + (error.message || ""));
      return;
    }

    if (data) {
      alert("You are successfully signed up!");
      router.push("/");
      router.refresh();
    }

    
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        console.log("GOOGLE LOGIN ERROR:", error);

        toast.error(error.message || "Google login failed", {
          position: "top-center",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        });
      }
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
    <form onSubmit={handleSubmit(handleSubmitForm)}  className="container shadow-xl mx-auto bg-stale-100 flex flex-col justify-center items-center mt-10">
      <fieldset className="fieldset w-full max-w-md rounded-2xl bg-gray-300 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl">
        <h1 className=" font-bold text-center text-[20px] py-3 ">
          Create an Account
        </h1>

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


                        {/* Divider */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />

          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            or sign in with email
          </span>

          <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        </div>


        {/* NAME */}
        <label className="label">Name</label>
        <input
          type="text"
          className="input w-full border border-orange-500 dark:border-white" 
          placeholder="Enter your name"
          {...register("name", {
            required: "Name is required",
          })}
        />

        {errors.name && (
          <span className="text-red-600">This field is required</span>
        )}

        {/* URL */}
        <label className="label">Photo URL</label>
        <input
          type="text"
          className="input w-full border border-orange-500 dark:border-white" 
          placeholder="Enter Photo url...."
          {...register("url", {
            required: "URL is required",
          })}
        />

        {errors.url && (
          <span className="text-red-600">This field is required</span>
        )}

        {/* EMAIL  */}
        <label className="label">Email</label>
        <input
          type="email"
          className="input w-full border border-orange-500 dark:border-white" 
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
        />

        {errors.email && (
          <span className="text-red-600">This field is required</span>
        )}

        {/* PASSWORD */}
        <label className="label">Password</label>



        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            className="input w-full pr-12  border border-orange-500 dark:border-white"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
            })}
          />

          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setshowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
           <div className="flex justify-end mt-[2px]">  
                                <Link
                        href="/forgot-password"
                        className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
        </div>

        {errors.password && (
          <span className="text-red-600">This field is required</span>
        )}

        <button className="w-full  hover:bg-orange-600 bg-orange-400 text-white font-bold py-2 px-4 rounded">
          Register
        </button>

        <div className="flex mt-3 justify-center items-center space-x-2">
          <h1 className="text-[13px]">Already have An Account?</h1>
          <Link href="/login" className="text-[13px] text-red-600 font-bold">
            Login
          </Link>
        </div>
      </fieldset>
    </form>
  );
};

export default SignupPage;
