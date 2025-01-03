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
import * as yup from "yup";
import Link from "next/link";

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading, login } = useAuth();


  const [errors, setErrors] = useState<Record<string, string>>({});

  const getValidationSchema = () => {
    const baseSchema = {
      email: yup.string().email("Invalid email format").required("Email is required"),
      password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    };

    return yup.object().shape(baseSchema);
  };


  const validateForm = async () => {
    const schema = getValidationSchema();
    try {
      await schema.validate(
        { email, password },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors: Record<string, string> = {};
      (validationErrors as yup.ValidationError).inner.forEach((error) => {
        if (error.path) {
          newErrors[error.path] = error.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    const isValid = await validateForm();
    if (isValid) {
      login(email, password);
    }
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
              <Link
                href="/"
                className="flex items-center mr-4 justify-center rounded-lg hover group"
              >
                <Image src={Logo} alt="LOGO" className="w-[60%]" />
              </Link>
            </li>

          </ul>
        </div>
      </aside>

      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen pt-20 items-center w-full bg-gray-50">
          <Section heading="Login" classnames="flex-col justify-start h-[50vh] w-[65%] space-x-4">

            <form onSubmit={handleSubmit} className="w-[40%] mb-20">
              <div className="flex-1 mb-6">
                <Input
                  classnames="py-1"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeHolder="Enter Email"
                  type="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 fixed">{errors.email}</p>
                )}
              </div>

              <div className="flex-1 mb-10">
                <Input
                  classnames="py-1"
                  value={password}
                  required
                  type="password"
                  placeHolder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1 fixed">{errors.password}</p>
                )}
              </div>

              <div className="flex justify-start py-3">
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
            <div
              className="text-sm font-semibold text-[#FB5151] py-6 underline font-serif cursor-pointer w-[10%]"
              onClick={() => router.push("/ForgotPassword")}
            >
              Forgot Password
            </div>
          </Section>
        </div>
      </div>
    </>
  );
}

export default Page;
