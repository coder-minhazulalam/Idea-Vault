"use client";

import { ThemeProvider } from "@/Components/ThemeProvider";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}  className="container shadow-xl mx-auto bg-stale-100 flex flex-col justify-center items-center mt-10">
      <fieldset className="fieldset bg-gray-200 border-base-300 w-11/12 md:w-5/12 p-10 rounded-box">
        <h1 className=" font-bold text-center text-[20px] py-3 ">
          Create an Account
        </h1>
        {/* NAME */}
        <label className="label">Name</label>
        <input
          type="text"
          className="input w-full"
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
          className="input w-full"
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
          className="input w-full"
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
            className="input w-full pr-12"
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
        </div>

        {errors.password && (
          <span className="text-red-600">This field is required</span>
        )}

        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
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
