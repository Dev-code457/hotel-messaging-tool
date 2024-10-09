"use client";
import React, { useState } from "react";
import Section from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "../assets/CheckIn.svg";
import axios from "axios";
import { toast } from "sonner";
import SideLayout from "@/components/SideLayout";

function CheckInOut() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async () => {
    // EX :- http://localhost:3000/api/send-message
    const promise = axios.post("/api/checkInOut", {
      phoneNumber,
    });

    toast.promise(promise, {
      loading: "Please wait, Sending message...",
      success: (response) => {
        const data = response.data;
        return data.message || "Message sent successfully!";
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

  const handleCheckIn = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPhoneNumber("");
    await handleSubmit();
  };

  const handleCheckOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPhoneNumber("");
    await handleSubmit();
  };

  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Check In & Check Out"
            classnames="flex-col justify-start w-[70%] h-[35vh]"
          >
            <div className="grid grid-cols-5 gap-4 ">
              <div className="col-span-3">
                <form>
                  <Input
                    classnames="py-14"
                    value={phoneNumber}
                    placeHolder="Enter Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <div className="flex  justify-start space-x-11 ">
                    <Button
                      text="Send Check In Message"
                      classnames="bg-green-500 hover:bg-green-600 py-5"
                      type="submit"
                      onClick={handleCheckIn}
                    />
                    <Button
                      text="Send Check Out Message"
                      classnames="bg-blue-500 hover:bg-blue-600"
                      type="submit"
                      onClick={handleCheckOut}
                    />
                  </div>
                </form>
              </div>
              <div className="col-span-2 flex justify-center items-center">
                <Image
                  src={Hero}
                  alt="Check In & Check Out"
                  className="mt-10 w-[90%] h-[100%]"
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
