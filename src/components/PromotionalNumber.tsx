"use client";
import React, { useState } from "react";
import Section from "./Layout";
import Input from "./Input";
import Button from "./Button";
import Hero from "../app/assets/PromotionalMessage.svg";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

function PromotionalNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async () => {
    const promise = axios.post("/api/PromotionalNumber", {
      phoneNumber,
    });
setPhoneNumber("")
    toast.promise(promise, {
      loading: "Please wait...",
      success: (response) => {
        const data = response.data;
        return data.message || "Message sent successfully!";
      },
      error: (error) => {
        if (error.response && error.response.data) {
          return (
            error.response.data.error || "Error while saving Phone Number."
          );
        } else {
          return error.message || "An unknown error occurred.";
        }
      },
    });
  };

  return (
    <Section heading="Add Promotional Number" classnames="my-32">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <div className="flex justify-start items-center mt-11 -space-x-6">
            <Input
              classnames="p-10 flex-grow"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button
              text="Save"
              classnames="bg-blue-500 hover:bg-blue-600 -mt-[0.5px] "
              type="submit"
              onClick={handleSubmit}
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <Image
            src={Hero}
            alt="Check In & Check Out"
            width={400}
            height={0}
            className="mt-6"
          />
        </div>
      </div>
    </Section>
  );
}

export default PromotionalNumber;
