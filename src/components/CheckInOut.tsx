"use client";
import React, { useState } from "react";
import Section from "./Layout";
import Input from "./Input";
import Button from "./Button";
import Image from "next/image";
import Hero from "../app/assets/CheckIn.svg";
import axios from "axios";
import { toast } from "sonner";

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
    setPhoneNumber("")
    await handleSubmit();
  };

  const handleCheckOut = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPhoneNumber("")
    await handleSubmit();
  };

  return (
    <Section
      heading="Check In & Check Out"
      classnames="flex-col justify-start "
    >
      <div className="grid grid-cols-5 gap-4 ">
        <div className="col-span-3">
          <form>
            <Input
              classnames="p-10"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="flex  justify-center -mt-6">
              <Button
                text="Send Check In Message"
                classnames="bg-green-500 hover:bg-green-600"
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
            width={400}
            height={300}
            className="mt-8"
          />
        </div>
      </div>
    </Section>
  );
}

export default CheckInOut;
