"use client";
import React, { useState } from "react";
import Section from "./Layout";
import Button from "./Button";
import Image from "next/image";
import Hero from "../app/assets/PromotionalNumber.svg";
import axios from "axios";
import { toast } from "sonner";

function PromotionalMessage() {
  const sendBulkMessage = async (messageType: "diwali" | "newyear") => {
    const promise = axios.post("/api/Promotinal", {
      messageType,
    });
    toast.promise(promise, {
      loading: "Please wait, Sending message...",
      success: (response) => {
        const data = response.data;
        return data.message || "Message sent successfully!";
      },
      error: (error) => {
        if (error.response && error.response.data) {
          return error.response.data.error || "Error sending message";
        } else {
          return error.message || "An unknown error occurred.";
        }
      },
    });
  };

  return (
    <Section
      heading="Send Promotional Messages"
      classnames="flex-col justify-center items-center "
    >
      <div className="grid grid-cols-5 gap-4 ">
        <div className="col-span-3">
          <div className="flex gap-4 justify-start items-center mt-20">
            <Button
              text="Send Diwali Message"
              classnames="bg-green-500 hover:bg-green-600"
              onClick={() => sendBulkMessage("diwali")}
            />
            <Button
              text="Send New Year Message"
              classnames="bg-blue-500 hover:bg-blue-600"
              onClick={() => sendBulkMessage("newyear")}
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-center items-center">
          <Image
            src={Hero}
            alt="Promotional Messages"
            width={180}
            height={300}
            className="mt-8"
          />
        </div>
      </div>
    </Section>
  );
}

export default PromotionalMessage;
