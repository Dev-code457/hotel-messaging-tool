"use client";

import Image from "next/image";
import React, { ReactNode, useLayoutEffect, useState } from "react";
import Logo from "@/app/public/assets/Logo.svg";
import HelperImage from "@/app/public/assets/Login.com.svg";
import Section from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Spinner from "@/components/Loader";
import useAuth from "@/hooks/useAuth";

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [hotelName, setHotelName] = useState<string>("");
  const { loading, signUp } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(email, password, hotelName);
  };

  useLayoutEffect(() => {
    const token = Cookies.get("_session");
    if (token) {
      router.push("/AddNumber");
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
        <div className="flex flex-col h-screen pt-20 items-center w-full bg-gray-50">
          <Section heading="SignUp" classnames="flex-col justify-start h-[60vh] w-[65%] space-x-4">


            <form onSubmit={handleSubmit} className="w-[40%] mb-9">
              <Input
                classnames="py-1 "
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeHolder="Enter Email"
                type="email"
              />
              <Input
                classnames="py-1"
                value={password}
                required
                type="password"
                placeHolder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                classnames="py-1"
                value={hotelName}
                required
                type="text"
                placeHolder="Enter HotelName"
                onChange={(e) => setHotelName(e.target.value)}
              />
              <div className="flex justify-start -mb-5 py-3">
                <Button
                  text={loading ? <div className={"flex gap-2 font-bold justify-center items-center"}><Spinner /> Logging In...</div> : "Submit"}
                  classnames="bg-green-500 hover:bg-green-600"
                  type="submit"
                  disabled={loading}
                />
              </div>
              <div className="absolute right-0 -mt-[9%]">
                <Image
                  src={HelperImage}
                  alt="Check In & Check Out"
                  className="-mt-8 w-[70%]"
                />
              </div>
            </form>

          </Section>
        </div>
      </div>
    </>
  );
}

export default Page;
