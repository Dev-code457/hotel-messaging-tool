"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "@/app/public/assets/GoodPegg.png";
import HelperImage from "@/app/public/assets/Login.com.svg";
import Section from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Spinner from "@/components/Loader";
import useAuth from "@/hooks/useAuth";
import bgImage from "@/app/public/assets/leaf.jpg";
import Link from "next/link";

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loadingRedirect, setLoadingRedirect] = useState(true); // New state for loading
  const { loading, login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    const token = Cookies.get("_session");
    if (token) {
      router.push("/AddNumber");
    } else {
      setLoadingRedirect(false); // Stop loader if no redirect
    }
  }, [router]);

  if (loadingRedirect) {
    // Render full-screen loader while checking for redirection
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex overflow-hidden h-screen">
      <div className="w-[60%]">
        <div className="absolute left-2">
          <Image src={Logo} alt="bgImage" className="w-32 h-32 left-20 p-2 rounded-xl" />
        </div>
        <Image src={bgImage} alt="bgImage" className="w-full h-full" />
      </div>
      <div className="bg-gray-50 w-[50%]">
        <div className="flex justify-center">
          <div className="flex flex-col h-screen pt-40 items-center w-full">
            <Section heading="Login" classnames="flex-col h-[50vh] w-[85%] space-x-4">
              <form onSubmit={handleSubmit} className="w-[60%] -mb-6">
                <Input
                  classnames="py-1"
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
                <div className="flex justify-start -mb-5 py-3">
                  <Button
                    text={
                      loading ? (
                        <div className="flex gap-2 font-bold justify-center items-center">
                          <Spinner /> Please Wait...
                        </div>
                      ) : (
                        "Sign In"
                      )
                    }
                    classnames="bg-green-500 hover:bg-green-600"
                    type="submit"
                    disabled={loading}
                  />
                </div>
                <div className="absolute -right-40 -mt-[9%]">
                  <Image
                    src={HelperImage}
                    alt="Check In & Check Out"
                    className="w-[60%]"
                  />
                </div>
              </form>
              <div
                className="text-sm font-semibold text-[#FB5151] py-6 underline font-serif cursor-pointer w-auto"
                onClick={() => router.push("/ForgotPassword")}
              >
                Forgot Password
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
