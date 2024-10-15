"use client";
import React, { useState } from "react";
import Section from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "@/app/public/assets/forgot password.svg";
import axios from "axios";
import { toast } from "sonner";
import SideLayout from "@/components/SideLayout";
import Cookies from "js-cookie";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload on form submit
    const token = Cookies.get("_session");
    console.log("hellooooooooooo");
    
console.log(token);

    try {
      const promise = axios.put("/api/auth/change-password", {
        password,
        newPassword
      }, {
        headers: {
          Authorization:token,
        },
      });

      toast.promise(promise, {
        loading: "Please wait...",
        success: (response) => {
          const data = response.data;
          return data.message || "Reset Link sent successfully!";
        },
        error: (error) => {
          if (error.response && error.response.data) {
            return error.response.data.error || "Something went wrong!";
          } else {
            return error.message || "An unknown error occurred.";
          }
        },
      });
    } catch (err) {
      toast.error("Failed to send request");
    }
  };

  const token = Cookies.get("_session");

  console.log(token);
  

  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Reset Password"
            classnames="flex-col justify-start items-center w-[65%] h-[50vh] space-x-6"
          >
            <div className=" grid grid-cols-2 gap-4 mb-5 z-20">
              <div className="col-span-1">
                <form onSubmit={handleSubmit} >
                  <Input
                    classnames=""
                    value={password}
                    required
                    placeHolder="Current Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    classnames="pt-4"
                    value={newPassword}
                    required
                    placeHolder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className="flex justify-start pt-6">
                    <Button
                      text="Submit"
                      classnames="bg-green-500 hover:bg-green-600 py-4 px-8"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
              <div className="col-span-1 w-full">
                <div className="flex justify-end items-end absolute">
                  <Image
                    src={Hero}
                    alt="Forgot Password"
                    className="w-[90%] pt-28"
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
