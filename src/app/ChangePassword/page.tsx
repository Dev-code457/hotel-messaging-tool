"use client";
import React from "react";
import Section from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "@/app/public/assets/forgot password.svg";
import SideLayout from "@/components/SideLayout";
import useChangePassword from "@/hooks/useChangePassword";
import Spinner from "@/components/Loader";

function ChangePassword() {
  const {
    password,
    setPassword,
    newPassword,
    setNewPassword,
    handleChangePassword,
    loading,
  } = useChangePassword();

  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Reset Password"
            classnames="flex-col justify-start items-center w-[65%] h-[50vh] space-x-6"
          >
            <div className="grid grid-cols-2 gap-4 mb-5 z-20">
              <div className="col-span-1">
                <form onSubmit={handleChangePassword}>
                  <Input
                    value={password}
                    required
                    placeHolder="Current Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input
                    classnames="pt-4"
                    value={newPassword}
                    required
                    placeHolder="New Password"
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className="flex justify-start pt-6">
                    <Button
                      text={loading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Submit"}
                      classnames={`py-4 px-8 bg-green-500 hover:bg-green-600 `}
                      type="submit"
                      disabled={loading}
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
