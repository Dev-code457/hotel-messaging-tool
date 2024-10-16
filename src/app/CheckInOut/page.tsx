"use client";

import React from "react";
import Section from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "../public/assets/CheckIn.svg";
import SideLayout from "@/components/SideLayout";
import { useCheckInOut } from "@/hooks/useCheckInOut"; 
import Spinner from "@/components/Loader";

function CheckInOut() {
  const { phoneNumber, setPhoneNumber, loadingCheckIn, loadingCheckOut, handleCheckIn, handleCheckOut } = useCheckInOut();

  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Check In & Check Out"
            classnames="flex-col justify-start w-[65%] h-[35vh] space-x-4"
          >
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3">
                <form className="w-[100%] mt-16" onSubmit={(e) => e.preventDefault()}>
                  <Input
                    classnames="p"
                    type="number"
                    value={phoneNumber}
                    required
                    placeHolder="Enter Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}

                  />
                  <div className="flex justify-start space-x-5 mt-8 mb-5">
                    <Button
                      text={loadingCheckIn ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Sending...</div> : "Send Check In Message"}
                      classnames="bg-green-500 hover:bg-green-600 py-5"
                      type="submit"
                      onClick={handleCheckIn}
                      disabled={loadingCheckIn}
                    />
                    <Button
                      text={loadingCheckOut ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Sending...</div> : "Send Checkout Message"}
                      classnames="bg-blue-500 hover:bg-blue-600"
                      type="submit"
                      onClick={handleCheckOut}
                      disabled={loadingCheckOut}
                    />
                  </div>
                </form>
              </div>

              <div className="col-span-2 flex justify-center items-center">
                <Image
                  src={Hero}
                  alt="Check In & Check Out"
                  className="mt-10 -mb-24 w-[90%] h-[100%]"
                />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>
  );
}

export default CheckInOut;
