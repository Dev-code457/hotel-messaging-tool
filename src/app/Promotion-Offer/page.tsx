"use client";
import React, { useState } from "react";
import Image from "next/image";
import Hero from "../public/assets/PromotionalNumber.svg";
import axios from "axios";
import { toast } from "sonner";
import Section from "@/components/Layout";
import Button from "@/components/Button";
import SideLayout from "@/components/SideLayout";
import Input from "@/components/Input";
import RangeSlider from "@/components/RangeSlider";
import MessageBg from "@/app/public/assets/wallaper.png";
import { useDispatch } from "react-redux";
import { MessagesUsed } from "@/redux/slices/exampleSlice";

function PromotionalMessage() {
  const [discount, setDiscount] = useState<number | undefined>(undefined);
  const [hotelName, setHotelName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [sliderValue, setSliderValue] = useState<number>(0);
  const dispatch = useDispatch();

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numberValue = parseFloat(value);

    if (!isNaN(numberValue)) {
      setDiscount(numberValue);
    } else if (value === "") {
      setDiscount(undefined);
    }
  };

  const handleSliderValueChange = (value: number) => {
    setSliderValue(value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/  /g, ",");
    setAddress(formattedValue);
  };

  const sendBulkMessage = async () => {
    const promise = axios.post("/api/Promotional", {
      discount,
      hotelName,
      phoneNumber,
      address,
      sliderValue,
    });
    toast.promise(promise, {
      loading: "Please wait, Sending message...",
      success: (response) => {
        const data = response.data;
        dispatch(MessagesUsed());
        setAddress("");
        setPhoneNumber("");
        setDiscount(0);
        setHotelName("");
        setSliderValue(0);

        return data.message || "Message sent successfully!";
      },
      error: (error) => {
        console.log(error);

        if (error.response && error.response.data) {
          console.log(error);
          return error.response.data.error || "Something went wrong!";
        } else {
          return error.message || "An unknown error occurred.";
        }
      },
    });
  };

  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Promotional Messages"
            classnames="flex justify-between h-[80vh] w-[70%] space-x-4"
          >
            <div className="flex w-[80%] justify-between">
              {/* Form Section */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendBulkMessage();
                }}
                className="w-[60%]"
              >
                <Input
                  classnames="pt-6 mb-3"
                  value={discount !== undefined ? `${discount}` : ""}
                  required
                  onChange={handleDiscountChange}
                  placeHolder="Enter Discount / Off"
                />
                <Input
                  classnames="mb-3"
                  value={hotelName}
                  required
                  placeHolder="Enter Hotel Name"
                  onChange={(e) => setHotelName(e.target.value)}
                />
                <Input
                  classnames="mb-3"
                  value={phoneNumber}
                  required
                  placeHolder="Enter Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Input
                  classnames="mb-3"
                  value={address}
                  required
                  placeHolder="Enter Address"
                  onChange={handleAddressChange} // Updated onChange handler
                />
                <div className="flex justify-start my-4">
                  <Button
                    text="Send"
                    classnames="bg-green-500 hover:bg-green-600 px-8"
                    type="submit"
                  />
                </div>

                {/* Image */}
                <div className="absolute -right-[8%] -mt-[4%]">
                  <Image
                    src={Hero}
                    alt="Check In & Check Out"
                    className="-mt-[20%] w-[70%] h-[70%]"
                  />
                </div>
              </form>

              {/* Message Preview Section */}
              <div className="flex justify-center items-center ml-10 z-0 relative">
                <div
                  className="w-[90%] h-auto max-w-[350px] flex justify-center items-center text-[12px] rounded-xl bg-white p-4 z-10 text-left font-sans whitespace-normal text-black"
                  style={{
                    backgroundSize: "cover",
                    borderRadius: "0 18px 18px 18px",
                    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    padding: "10px 15px",
                    maxWidth: "350px",
                  }}
                >
                  <p>
                    🌟{" "}
                    <strong>
                      {discount ? (
                        `${discount}% Off`
                      ) : (
                        <span className="text-gray-500 underline font-bold">
                          Discount
                        </span>
                      )}{" "}
                      with Advance Booking! 🌟
                    </strong>
                    <br />
                    Book your stay at{" "}
                    {hotelName || (
                      <span className="text-gray-500 underline font-bold">
                        Hotel Name
                      </span>
                    )}{" "}
                    and enjoy{" "}
                    {discount ? (
                      `${discount}% Off`
                    ) : (
                      <span className="text-gray-500 underline font-bold">
                        Discount
                      </span>
                    )}{" "}
                    on all food orders!
                    <br />
                    <br />
                    📞 <strong>Reservations:</strong> Call{" "}
                    {phoneNumber || (
                      <span className="text-gray-500 underline font-bold">
                        Phone Number
                      </span>
                    )}
                    <br />
                    📍 <strong>Address:</strong>{" "}
                    {address || (
                      <span className="text-gray-500 underline font-bold">
                        Address
                      </span>
                    )}
                    <br />
                    <br />
                    <strong>Don’t miss out—reserve now!</strong>
                  </p>
                </div>
                {/* Background Image */}
                <Image
                  src={MessageBg}
                  alt="Message background"
                  className="w-[100%] -mt-[1%] h-[70%] absolute rounded-2xl"
                />
              </div>

              {/* Slider Section */}
              <div className="w-[10%] flex items-center -mr-[21%] -mt-10">
                <RangeSlider onValueChange={handleSliderValueChange} />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>
  );
}

export default PromotionalMessage;
