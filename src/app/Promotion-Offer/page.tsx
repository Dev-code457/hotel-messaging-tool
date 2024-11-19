'use client'
import React, { useEffect, useState } from "react";
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
import Profile from "@/components/Profile";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



function PromotionalMessage() {
  const hotelDetail = useSelector((state: RootState) => state.hotel.details);
  const [selectedTemplate, setSelectedTemplate] = useState("discounts");

  const {
    discount,
    ownerHotelName,
    phoneNumber,
    address,
    date,
    time,
    loading,
    sliderValue,
    setHotelName,
    handleDiscountChange,
    handleSliderValueChange,
    handleAddressChange,
    handleDateChange,
    handleTimeChange,
    handlePhoneNumberChange,
    sendBulkMessage,
  } = usePromotionalMessage(hotelDetail?.hotelName || "");



  const renderFormFields = () => {
    switch (selectedTemplate) {
      case "discounts":
        return (
          <>
            <Input
              type="number"
              classnames="pt-6 mb-3"
              value={discount || ""}
              required
              onChange={handleDiscountChange}
              placeHolder="Enter Discount / Off"
            />
            <Input
              type="text"
              classnames="mb-3"
              value={ownerHotelName || ""}
              required
              placeHolder="Enter Hotel Name"
              onChange={(e) => setHotelName(e.target.value)}
            />
            <Input
              type="tel"
              classnames="mb-3"
              value={phoneNumber || ""}
              required
              placeHolder="Enter Phone Number"
              onChange={handlePhoneNumberChange}
            />
            <Input
              type="text"
              classnames="mb-3"
              value={address || ""}
              required
              placeHolder="Enter Address"
              onChange={handleAddressChange}
            />
          </>
        );
      case "roomBooking":
        return (
          <>
            <Input
              type="date"
              classnames="pt-6 mb-3"
              required
              value={date || ""}
              onChange={handleDateChange}
              placeHolder="Select Date"
            />

            <Input
              type="text"
              classnames="mb-3"
              value={hotelDetail?.UserDetails?.hotelName || ownerHotelName || ""}
              required
              placeHolder="Enter Hotel Name"
              onChange={(e) => setHotelName(e.target.value)}
            />
            <Input
              type="text"
              classnames="mb-3"
              value={phoneNumber || ""}
              required
              placeHolder="Enter Phone Number"
              onChange={handlePhoneNumberChange}
            />
            <Input
              type="text"
              classnames="mb-3"
              value={address || ""}
              required
              placeHolder="Enter Address"
              onChange={handleAddressChange}
            />



          </>
        );

      case "eventBooking":
        return (
          <>


            <Input
              type="text"
              classnames="pt-6 mb-3"
              value={hotelDetail?.UserDetails?.hotelName || ownerHotelName || ""}
              required
              placeHolder="Enter Hotel Name"
              onChange={(e) => setHotelName(e.target.value)}
            />
            <Input
              type="text"
              classnames="mb-3"
              value={phoneNumber || ""}
              required
              placeHolder="Enter Phone Number"
              onChange={handlePhoneNumberChange}
            />




          </>
        );
      case "partyInvitation":
        return (
          <>
            <Input
              type="date"
              classnames="pt-6 mb-3"
              required
              value={date || ""}
              onChange={handleDateChange}
              placeHolder="Select Date"
            />
            <Input
              type="time"
              classnames="mb-3"
              value={time || ""}
              placeHolder="Select Time"
              onChange={handleTimeChange}
            />
            <Input
              type="text"
              classnames="mb-3"
              value={address || ""}
              required
              placeHolder="Enter Address"
              onChange={handleAddressChange}
            />
            <Input
              type="text"
              classnames="mb-3"
              value={hotelDetail?.UserDetails?.hotelName || ownerHotelName || ""}
              required
              placeHolder="Enter Hotel Name"
              onChange={(e) => setHotelName(e.target.value)}
            />
            <Input
              type="text"
              classnames="mb-3"
              value={phoneNumber || ""}
              required
              placeHolder="Enter Phone Number"
              onChange={handlePhoneNumberChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SideLayout>
      <Profile onSelectForm={undefined} />
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col justify-center items-center w-full bg-gray-50">
          <SelectDefault
            setSelectedTemplate={setSelectedTemplate}
            selectedTemplate={selectedTemplate}
          />
          <Section heading="Promotional Messages" classnames="flex mb-10 justify-between h-[95vh] w-[75%] space-x-4">
            <div className="flex w-[80%] justify-between">
              <form onSubmit={(e) => { e.preventDefault(); }} className="w-[60%]">
                <div className="pt-2">
                  {renderFormFields()}
                </div>
                <div className="flex justify-start my-4">
                  <Button
                    text={loading ? <Spinner /> : "Submit"}
                    classnames="bg-green-500 hover:bg-green-600 px-8"
                    onClick={() => sendBulkMessage(selectedTemplate)}
                    disabled={loading}
                  />
                </div>
              </form>
              <div className="absolute right-[3%] mt-[13%]">
                <MessagePreviewWindow
                  address={address}
                  discount={discount}
                  hotelName={hotelDetail?.hotelName || ownerHotelName || ""}
                  phoneNumber={phoneNumber}
                  date={date}
                  time={time}
                  selectedTemplate={selectedTemplate}
                />
              </div>
              <div className="w-[10%] flex items-center -mr-[21%] absolute right-[19%] mt-[10%]">
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
