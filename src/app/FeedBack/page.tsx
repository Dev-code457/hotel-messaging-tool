"use client"; // Ensure this component runs on the client side
import React, { useState } from "react";
import Section from "../../components/Layout";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "../public/assets/feedbak.com.svg";
import SideLayout from "@/components/SideLayout";
import useFeedback from "@/hooks/useFeedback";
import Spinner from "@/components/Loader";
import Profile from "@/components/Profile";

const CheckInOut = () => {
  const [feedback, setFeedback] = useState("");
  const { loading, handleSubmitFeedback } = useFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitFeedback(feedback);
    setFeedback("")
  };

  return (
    <SideLayout>

      <Profile onSelectForm={undefined} />
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Feedback"
            classnames="flex-col justify-start items-center w-[65%] h-[35vh]"
          >
            <div className=" ">
              <div className="col-span-2 ">
                <form
                  onSubmit={handleSubmit}
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
                      text={loading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Submit"}
                      classnames="bg-green-500 hover:bg-green-600 py-3 px-8"
                      type="submit"
                      disabled={loading}
                    />
                  </div>
                </form>
              </div>
              <div className=" w-full ml-8">
                <div className="col-span-3 flex justify-end items-end  ">
                  <Image
                    src={Hero}
                    alt="Check In & Check Out"
                    className=" w-[25%]  -mt-24 ml-10"
                  />
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>
  );
};

export default CheckInOut;
