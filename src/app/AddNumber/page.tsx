"use client";
import React, { useState } from "react";

import Hero from "../public/assets/PromotionalMessage.svg";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import Section from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SideLayout from "@/components/SideLayout";

function PromotionalNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    const promise = axios.post("/api/customers", {
      phoneNumber,
      name,
      email
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
    <SideLayout>

      < div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">


          <Section heading="Add Promotional Number" classnames="flex-col  w-[70%]  h-[40vh]">
            <div className=" w-full ">
              <div className="flex justify-center">
                <div className="flex  items-center space-x-4 w-full p-2 ">
                  <Input
                    placeHolder="Enter Number"
                    classnames=""
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <Input
                    placeHolder="Enter Name"
                    classnames=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    placeHolder="Enter Email"
                    classnames=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                </div>

              </div>
              <div className="px-6 max-w-sm mt-4">
                <Button
                  text="Submit"
                  classnames="bg-green-500 hover:bg-green-600 py-4 px-8"
                  type="submit"
                  onClick={handleSubmit}
                />
              </div>

            </div>

            <div className="col-span-2 flex justify-end">
              <Image
                src={Hero}
                alt="Check In & Check Out"

                className="w-[30%] h-[100%] -mt-24 -mb-8"
              />
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>
  );
}

export default PromotionalNumber;
