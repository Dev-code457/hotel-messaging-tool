"use client";

import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";
import Logo from "@/app/public/assets/Logo.svg";
import Section from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import HelperImage from "@/app/public/assets/Login.com.svg";
import Cookies from "js-cookie"; // Import js-cookie

function Page({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    const promise = axios.post("/api/auth/login", {
      email,
      password,
    });

    toast.promise(promise, {
      loading: "Logging in...",
      success: (response) => {
        const data = response.data;

        // Store the token in a cookie
        Cookies.set("_session", data.token, { expires: 7 }); // Set cookie to expire in 7 days

        // On successful login, redirect to CheckInOut page
        router.push("/CheckInOut"); // Redirect to the CheckInOut page
        return data.message || "Login successful!";
      },
      error: (error) => {
        if (error.response && error.response.data) {
          return error.response.data.error || "Something went wrong!";
        } else {
          return error.message || "An unknown error occurred.";
        }
      },
    });
  };

  useEffect(() => {
    // Check for the token in cookies
    const token = Cookies.get("_session"); // Retrieve the token from cookies
    if (token) {
      // If the token exists, redirect to CheckInOut
      router.push("/CheckInOut");
    }
  }, [router]);

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm rounded-lg sm:hidden hover:bg-gray-550 focus:outline-none focus:ring-2 dark:text-gray-400"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-black">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center -mt-6 text-gray-900 rounded-lg dark:text-white hover group"
              >
                <Image src={Logo} alt="LOGO" className="w-full h-full" />
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="sm:ml-64 flex justify-center">
          <div className="flex flex-col h-screen pt-20 items-center w-full bg-gray-50 ">
            <Section heading="Login" classnames="flex-col justify-start h-[60vh] w-[65%] space-x-4">
              <form onSubmit={handleSubmit} className="w-[40%]">
                <Input
                  classnames="py-6"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeHolder="Enter Email"
                />
                <Input
                  classnames="mb-8"
                  value={password}
                  required
                  placeHolder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-start">
                  <Button
                    text="Submit"
                    classnames="bg-green-500 hover:bg-green-600"
                    type="submit" 
                  />
                </div>
                <div className="absolute right-0 -mt-[6%]">
                  <Image
                    src={HelperImage}
                    alt="Check In & Check Out"
                    className="-mt-8 w-[70%] h-[70%]"
                  />
                </div>
              </form>
              <div className="text-sm font-semibold text-[#FB5151] py-6 underline font-serif cursor-pointer" onClick={()=>
                router.push("/ForgotPassword")
              }>
                Forgot Password
              </div>
            </Section>
          </div>
      </div>
    </>
  );
}

export default Page;
