"use client"; // Ensure this component is treated as a client component
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Section from "../../../components/Layout";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Image from "next/image";
import Hero from "@/app/public/assets/forgot password.svg";
import SideLayout from "@/components/SideLayout";
import { useRouter } from "next/navigation";
import { usePasswordReset } from "@/hooks/usePassword"; // Import the custom hook
import Spinner from "@/components/Loader";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const pathname = usePathname();
  const token = pathname.split("/").slice(-1)[0];
  const router = useRouter();

  // Use the custom hook
  const { resetPassword, loading } = usePasswordReset(token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword(password, confirmPassword);
  };

  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Change Password"
            classnames="flex-col justify-start items-center w-[70%] h-[50vh] space-x-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1 mt-12">
                <form onSubmit={handleSubmit}>
                  <Input
                    classnames="pt-10"
                    value={password}
                    placeHolder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                  <Input
                    classnames="py-4"
                    value={confirmPassword}
                    placeHolder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                  />

                  <div className="flex justify-start space-x-11 ">
                    <Button
                      text={loading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Submit"}
                      classnames="bg-green-500 hover:bg-green-600 py-4"
                      onClick={handleSubmit}
                      disabled={loading} // Disable button while loading
                    />
                  </div>
                  <div
                    className="text-sm font-semibold text-[#FB5151] p-3 underline font-serif cursor-pointer"
                    onClick={() => router.push("/")}
                  >
                    Login
                  </div>
                </form>
              </div>
              <div className="col-span-1 w-full">
                <div className="flex justify-end items-end mt-[25%]">
                  <Image
                    src={Hero}
                    alt="Reset Password Illustration"
                    className="w-[90%]"
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