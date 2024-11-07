"use client";
import React, { useState } from "react";
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
import { SelectDefault } from "@/components/SelectTemplates";

function PromotionalMessage() {
  const hotelDetail = useSelector((state: RootState) => state.hotel.details);
  const [selectedTemplate, setSelectedTemplate] = useState("roomBooking");
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
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <SelectDefault setSelectedTemplate={setSelectedTemplate} selectedTemplate={selectedTemplate} />
          <Section heading="Promotional Messages" classnames="flex justify-between h-[80vh] w-[70%] space-x-4">
            <div className="flex w-[80%] justify-between">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendBulkMessage();
                }}
                className="w-[60%]"
              >
                {selectedTemplate === "discounts" && (
                  <>
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
                      onChange={(e: React.FormEvent) => setPhoneNumber(e.target.value)}
                    />
                    <Input
                      type="text"
                      classnames="mb-3"
                      value={address}
                      required
                      placeHolder="Enter Address"
                      onChange={handleAddressChange}
                    />
                  </>
                )}

                {selectedTemplate === "roomBooking" && (
                  <>
                    <Input
                      type="date"
                      classnames="pt-6 mb-3"
                      required
                      onChange={handleDiscountChange} // Adjust as necessary
                      placeHolder="Select Date"
                    />
                    <Input
                      type="time"
                      classnames="pt-6 mb-3"
                      required
                      onChange={handleDiscountChange} // Adjust as necessary
                      placeHolder="Select Time"
                    />
                    <Input
                      type="text"
                      classnames="mb-3"
                      value={hotelDetail?.hotelName || hotelName || ""}
                      required
                      placeHolder="Enter Hotel Name"
                      onChange={(e) => setHotelName(e.target.value)}
                    />
                  </>
                )}

                {selectedTemplate === "eventBooking" && (
                  <Input
                    type="text"
                    classnames="mt-10"
                    value={hotelDetail?.hotelName || hotelName || ""}
                    required
                    placeHolder="Enter Hotel Name"
                    onChange={(e) => setHotelName(e.target.value)}
                  />
                )}

                {selectedTemplate === "partyInvitation" && (
                  <>
                    <Input
                      type="date"
                      classnames="pt-6 mb-3"
                      required
                      onChange={handleDiscountChange} // Adjust as necessary
                      placeHolder="Select Date"
                    />
                    <Input
                      type="time"
                      classnames="pt-6 mb-3"
                      required
                      onChange={handleDiscountChange} // Adjust as necessary
                      placeHolder="Select Time"
                    />
                    <Input
                      type="text"
                      classnames="mb-3"
                      value={address}
                      required
                      placeHolder="Enter Address"
                      onChange={handleAddressChange}
                    />
                  </>
                )}

                <div className="flex justify-start my-4">
                  <Button
                    text={loading ? <Spinner /> : "Submit"}
                    classnames="bg-green-500 hover:bg-green-600 px-8"
                    type="submit"
                    disabled={loading}
                  />
                </div>
              </form>
              <div className="absolute right-[3%] mt-[13%]">
                <MessagePreviewWindow
                  address={address}
                  discount={discount}
                  hotelName={hotelDetail?.hotelName || hotelName || ""}
                  phoneNumber={phoneNumber}
                  selectedTemplate={selectedTemplate}
                />
              </div>
              <div className="w-[10%] flex items-center -mr-[21%]  absolute right-[20%] mt-[10%]">
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
