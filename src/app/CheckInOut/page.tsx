"use client"; // This ensures that the component is treated as a client-side component

import React from "react";
import Section from "../../components/Layout";
import Input, { Checkbox } from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "../public/assets/CheckIn.svg";
import SideLayout from "@/components/SideLayout";
import { useCheckInOut } from "@/hooks/useCheckInOut";
import Spinner from "@/components/Loader";

function CheckInOut() {
  const {
    phoneNumber,
    setPhoneNumber,
    loadingCheckIn,
    loadingCheckOut,
    handleCheckIn,
    setUserSpending,
    handleCheckOut,
    userSpending,
    isPromotionalList,
    setIsPromotionalList,
  } = useCheckInOut();

  const handleCheckboxChange = () => {
    setIsPromotionalList(!isPromotionalList);
  };

  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Check In & Check Out"
            classnames={`flex-col justify-start w-[65%]  space-x-4 ${isPromotionalList ? " h-[50vh]" : "h-[35vh]"}`}
          >
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3">
                <form className={`w-[100%]${isPromotionalList ? "-mt-[30%}" : "mt-16"}`} onSubmit={(e) => e.preventDefault()}>
                  <Input
                    classnames="p"
                    type="number"
                    value={phoneNumber}
                    required
                    placeHolder="Enter Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {
                    isPromotionalList && (
                      <Input
                      classnames="py-3"
                      type="number"
                      value={userSpending}
                      placeHolder="User Spending Amount"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserSpending(e.target.value)}
                    />
                    
                    )
                  }

                  <Checkbox
                    checked={isPromotionalList} // Use the hook's checkbox state
                    classnames="-mb-10 py-5"
                    label="Want to add this Number to the Promotional List?"
                    onChange={handleCheckboxChange}
                  />
                  <div className="flex justify-start space-x-5 mt-8 mb-2">
                    <Button
                      text={
                        loadingCheckIn ? (
                          <div className={"flex gap-2 font-bold justify-center items-center"}>
                            <Spinner /> Sending...
                          </div>
                        ) : (
                          "Send Check In Message"
                        )
                      }
                      classnames="bg-green-500 hover:bg-green-600 py-3"
                      type="submit"
                      onClick={() => handleCheckIn(isPromotionalList)}
                      disabled={loadingCheckIn}
                    />
                    <Button
                      text={
                        loadingCheckOut ? (
                          <div className={"flex gap-2 font-bold justify-center items-center"}>
                            <Spinner /> Sending...
                          </div>
                        ) : (
                          "Send Check Out Message"
                        )
                      }
                      classnames="bg-blue-500 hover:bg-blue-600"
                      type="submit"
                      onClick={() => handleCheckOut(isPromotionalList)}
                      disabled={loadingCheckOut}
                    />
                  </div>
                </form>
              </div>

              <div className="col-span-2 flex justify-center items-center">
                <Image src={Hero} alt="Check In & Check Out" className={`  h-[100%] ${isPromotionalList ? "-mb-36 w-[100%]" : "-mb-20"}`} />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>
  );
}

export default CheckInOut;
