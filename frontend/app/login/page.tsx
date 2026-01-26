"use client";
import Image from "next/image";
import React, { useState } from "react";
import hero from "../../public/assets/hero.png";
import { FaPaw } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/users/login`, {
        email: email.trim(),
        password,
      });
      localStorage.setItem("token", response.data.accessToken);
      toast.success("Login successful!");

      router.push("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Failed to login");
      } else {
        toast.error("Something went wrong!");
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
              Welcome back!
            </h1>
            <p className="text-secondary text-[12px] font-light">
              Access Kenya&apos;s leading pet health early-warning system and
              keep your furry friend safe
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
            <h3 className="text-2xl font-extrabold text-black">Sign In</h3>
            <p className="text-[12px] text-gray-300">
              Welcome back to the Mune family
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            action=""
            className="w-[80%] flex flex-col gap-3"
          >
            <div className="flex flex-col gap-2 w-full relative">
              <label htmlFor="email" className="text-[12px] font-bold">
                Email Address
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
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
                required
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
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
              {loading ? <ClipLoader color="white" size={15} /> : <> Login</>}
            </button>
          </form>
          <div>
            <p className="text-[13px]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary font-bold">
                Sign Up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
