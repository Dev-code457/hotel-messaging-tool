"use client";
import React, { useState } from "react";
import Section from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "@/app/public/assets/forgot password.svg";
import SideLayout from "@/components/SideLayout";
import useForgotPassword from "@/hooks/useForgotpassword"; 
import Spinner from "@/components/Loader";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword, loading } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
    setEmail(""); // Clear the input field after submission
  };

  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Forgot Password"
            classnames="flex-col justify-start items-center w-[65%] h-[35vh] space-x-6"
          >
            <div className="grid grid-cols-2 gap-4 mb-10 z-20">
              <div className="col-span-1">
                <form onSubmit={handleSubmit}>
                  <Input
                    value={email}
                    required
                    placeHolder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                  <div className="flex justify-start pt-6">
                    <Button
                      text={loading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Submit"}
                      classnames={`py-4 px-8 bg-green-500 hover:bg-green-600 `}
                      type="submit"
                      disabled={loading} // Disable button during loading
                    />
                  </div>
                </form>
              </div>
              <div className="col-span-1 w-full">
                <div className="flex justify-end items-end absolute">
                  <Image
                    src={Hero}
                    alt="Forgot Password"
                    className="w-[90%] pt-8"
                  />
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>
  );
}

export default ChangePassword;
