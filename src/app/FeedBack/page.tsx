"use client";
import React, { useState } from "react";
import Section from "../../components/Layout";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "../public/assets/feedbak.com.svg";
import axios from "axios";
import { toast } from "sonner";
import SideLayout from "@/components/SideLayout";

function CheckInOut() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    try {
      const promise = axios.post("/api/Feedback", { feedback });
      toast.promise(promise, {
        loading: "Please wait",
        success: (response) => {
          const data = response.data;
          // Check if data.message is a string, or provide a default string
          const successMessage = typeof data.message === "string" ? data.message : "Thank you for your feedback!";
      setFeedback("")
          
          return successMessage; // Must return a string or valid JSX
        },
        error: (error) => {
          if (error.response && error.response.data) {
            return error.response.data.message || "Something went wrong!"; // Ensure this is a string
          }
          return error.message || "An unknown error occurred.";
        },
      });
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };
  
  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Feedback"
            classnames="flex-col justify-start items-center w-[65%] h-[50vh]"
          >
            <div className=" ">
              <div className="col-span-2 mb-10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className={`max-w-full mb-4 mr-10 ml-10`}>
                    <label
                      htmlFor="phone-input"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only"
                    >
                      Phone Number
                    </label>

                    <textarea
                      id="phone"
                      rows={3}
                      //   value={value}
                      //   onChange={onChange}
                      className="block w-full p-4 text-sm font-medium text-black border border-gray-300 rounded-lg bg-gray-100 placeholder-gray-400"
                      placeholder={
                        "We’d love to hear your feedback! Help us make the app even better by sharing your thoughts..."
                      }
                      required
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>
                  <div className="px-10 max-w-sm mb-4">
                    <Button
                      text="Submit"
                      classnames="bg-green-500 hover:bg-green-600 py-4 px-8"
                      type="submit"
                    />
                  </div>
                </form>
              </div>
              <div className=" w-full ml-8">
                <div className="col-span-3 flex justify-end items-end  ">
                  <Image
                    src={Hero}
                    alt="Check In & Check Out"
                    className=" w-[40%]  -mt-28 ml-10"
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

export default CheckInOut;
