"use client";
import React, { useState } from "react";
import Hero from "../public/assets/PromotionalMessage.svg";
import Image from "next/image";
import Section from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SideLayout from "@/components/SideLayout";
import useAddNumber from "@/hooks/useAddNumber";
import Spinner from "@/components/Loader";

function PromotionalNumber() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const { handleSubmitFeedback, loading } = useAddNumber();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    const success = await handleSubmitFeedback(phoneNumber, email, name);
    if (success) {
      // Optionally clear the inputs if submission was successful
      setPhoneNumber("");
      setEmail("");
      setName("");
    }
  };

  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section heading="Add Promotional Number" classnames="flex-col w-[70%] h-[40vh]">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex justify-center">
                <div className="flex items-center space-x-4 w-full p-2">
                  <Input
                    placeHolder="Enter Number"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="number" // Use 'tel' for phone number
                  />
                  <Input
                    placeHolder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
          
                  />
                  <Input
                    placeHolder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                
                  />
                </div>
              </div>
              <div className="px-6 max-w-sm mt-4">
                <Button
                       text={loading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Submit"}
                  classnames={`py-4 px-8 bg-green-500 hover:bg-green-600`}
                  type="submit"
                  disabled={loading}
                />
              </div>
            </form>
            <div className="col-span-2 flex justify-end">
              <Image
                src={Hero}
                alt="Promotional Message"
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
