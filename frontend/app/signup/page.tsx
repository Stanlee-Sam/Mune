"use client";
import Image from "next/image";
import React, { useState } from "react";
import hero from "../../public/assets/hero.png";
import { FaPaw } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import api from "@/lib/axios";
import { toast } from "sonner";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !name) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/users/register`, {
        name,
        email: email.trim(),
        password,
      });
      toast.success("Registration successful!");
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Failed to register");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center bg-background-gray items-center h-screen">
      <div className="flex md:w-[80%] w-[90%] rounded-xl overflow-hidden items-stretch min-h-125">
        <div className="right-div hidden md:flex md:w-1/2 relative">
          <Image fill className="object-cover" src={hero} alt="" />
          <div className="absolute bottom-10 left-5 flex flex-col p-6 gap-2 justify-center items-start  w-[90%] bg-cover rounded-[20px] bg-white/25 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-md border border-white/18">
            <h1 className="text-white text-2xl font-extrabold">
              Join the Mune Family
            </h1>
            <p className="text-secondary text-[12px] font-light">
              Start your journey towards proactive pet health and join a
              community of dedicated pet owners in Kenya.
            </p>
          </div>
        </div>
        <div className="left-div md:w-1/2 w-full bg-background flex flex-col items-center md:items-start gap-4 p-6">
          <div className="flex flex-row gap-2 items-start md:items-center">
            <div className="text-2xl text-primary">
              <FaPaw />
            </div>
            <h3 className="text-[20px] font-extrabold text-black">Mune</h3>
          </div>
          <div className="flex flex-col gap-2 items-center md:items-start justify-center">
            <h3 className="text-2xl font-extrabold text-black">
              Create Account
            </h3>
            <p className="text-[12px] text-gray-300">
              Protect your pet with Kenya's leading pet health early-warning
              system.
            </p>
          </div>
          <form
            onSubmit={handleSignUp}
            action=""
            className="w-[80%] flex flex-col gap-3"
          >
            <div className="flex flex-col gap-2 w-full relative">
              <label htmlFor="name" className="text-[12px] font-bold">
                Full Name
              </label>
              <input
                value={name}
                onChange={handleNameChange}
                type="text"
                name="name"
                id="name"
                required
                placeholder="John Doe"
                className="border p-2 rounded-md flex flex-row items-center w-full text-[15px] pl-7"
              />
              <div className="absolute bottom-2.5 left-1 text-[18px] text-gray-300">
                <IoPerson />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full relative">
              <label htmlFor="email" className="text-[12px] font-bold">
                Email Address
              </label>
              <input
                onChange={handleEmailChange}
                required
                value={email}
                type="email"
                name="email"
                id="email"
                placeholder="name@example.com"
                className="border p-2 rounded-md flex flex-row items-center w-full text-[15px] pl-7"
              />
              <div className="absolute bottom-2.5 left-1 text-[18px] text-gray-300">
                <IoIosMail />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full relative">
              <label htmlFor="password" className="text-[12px] font-bold">
                Password
              </label>
              <input
                value={password}
                onChange={handlePasswordChange}
                required
                type="password"
                name="password"
                id="password"
                placeholder="* * * * * * *"
                className="border p-2 rounded-md flex flex-row items-center w-full text-[15px] pl-7"
              />
              <div className="absolute bottom-2.5 left-1 text-[18px] text-gray-300">
                <FaLock />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-primary text-black w-full p-2 font-bold cursor-pointer rounded-lg hover:bg-secondary-foreground hover:text-white"
            >
              {loading ? (
                <ClipLoader color="white" size={15} />
              ) : (
                <> Create Account</>
              )}
            </button>
          </form>
          <div>
            <p className="text-[13px]">
              Already have an account?{" "}
              <Link href='/login' className="text-primary font-bold">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
