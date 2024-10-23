
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Hero from "../public/assets/PromotionalNumber.svg";
import Section from "@/components/Layout";
import Button from "@/components/Button";
import SideLayout from "@/components/SideLayout";
import Input from "@/components/Input";
import RangeSlider from "@/components/RangeSlider";

import Spinner from "@/components/Loader";
import usePromotionalMessage from "@/hooks/usePromotionalMessage";
import { MessagePreviewWindow } from "@/components/MessagePreviewWindow";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileInfoPopover } from "@/components/Info";

function PromotionalMessage() {
  const hotelDetail = useSelector((state: RootState) => state.hotel.details);
  const {
    discount,
    hotelName,
    phoneNumber,
    address,
    loading,
    sliderValue,
    setHotelName,
    setPhoneNumber,
    handleDiscountChange,
    handleSliderValueChange,
    handleAddressChange,
    sendBulkMessage,
  } = usePromotionalMessage(hotelDetail?.hotelName || "");


  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex h-screen justify-center items-center w-full bg-gray-50">
          <Section
            heading="Promotional Messages"
            classnames="flex justify-between h-[80vh] w-[70%] space-x-4"
          >
            <div className="flex w-[80%] justify-between">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendBulkMessage();
                }}
                className="w-[60%]"
              >
                <Input
                  type="number"
                  classnames="pt-6 mb-3"
                  value={discount !== undefined ? `${discount}` : ""}
                  required
                  onChange={handleDiscountChange}
                  placeHolder="Enter Discount / Off"
                />
                <Input
                  type="text"
                  classnames="mb-3"
                  value={hotelDetail?.hotelName || hotelName || ""}
                  required
                  placeHolder="Enter Hotel Name"
                  onChange={(e) => setHotelName(e.target.value)}
                />
                <Input
                  type="number"
                  classnames="mb-3"
                  value={phoneNumber !== undefined ? `${phoneNumber}` : ""}
                  required
                  placeHolder="Enter Phone Number"
                  onChange={(e: any) => setPhoneNumber(e.target.value)}
                />
                <Input
                  type="text"
                  classnames="mb-3"
                  value={address}
                  required
                  placeHolder="Enter Address"
                  onChange={handleAddressChange}
                />
                <div className="flex justify-start my-4">
                  <Button
                    text={loading ? (
                      <div className={"flex gap-2 font-bold justify-center items-center"}>
                        <Spinner /> Submitting...
                      </div>
                    ) : "Submit"}
                    classnames="bg-green-500 hover:bg-green-600 px-8"
                    type="submit"
                    disabled={loading}
                  />
                </div>
                <div className="absolute -right-[8%] -mt-[4%]">
                  <Image
                    src={Hero}
                    alt="Check In & Check Out"
                    className="-mt-[20%] w-[70%] h-[70%]"
                  />
                </div>
              </form>

              <MessagePreviewWindow
                address={address}
                discount={discount}
                hotelName={hotelDetail?.hotelName || hotelName || ""}
                phoneNumber={phoneNumber}
              />
              <div className="w-[10%] flex items-center -mr-[21%] -mt-10">
                <RangeSlider onValueChange={handleSliderValueChange} value={sliderValue} />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>


 
  );
}

export default PromotionalMessage;
