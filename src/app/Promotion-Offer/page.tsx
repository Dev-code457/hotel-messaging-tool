"use client";

import React, { useState } from "react";
import Section from "@/components/Layout";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SideLayout from "@/components/SideLayout";
import Spinner from "@/components/Loader";
import Profile from "@/components/Profile";
import RangeSlider from "@/components/RangeSlider";
import { MessagePreviewWindow } from "@/components/MessagePreviewWindow";
import { SelectDefault } from "@/components/SelectTemplates";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import * as yup from "yup";
import usePromotionalMessage from "@/hooks/usePromotionalMessage";
import { useHotelData } from "@/hooks/useHotelUser";

function PromotionalMessage() {
const {data}: any = useHotelData()
  const [selectedTemplate, setSelectedTemplate] = useState("discounts");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
  } = usePromotionalMessage(data?.data.User.hotelName || "");


console.log(time,"dnasjfndsjkfnksdnfl");

  const getValidationSchema = () => {
    switch (selectedTemplate) {
      case "discounts":
        return yup.object({
          discount: yup
            .number()
            .required("Discount is required")
            .min(1, "Discount must be at least 1%")
            .max(100, "Discount cannot exceed 100%"),
          ownerHotelName: yup.string().required("Hotel name is required"),
          phoneNumber: yup
            .string()
            .required("Phone number is required")
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
          address: yup.string().required("Address is required"),
        });
      case "roomBooking":
        return yup.object({
          date: yup.date().required("Date is required"),
          ownerHotelName: yup.string().required("Hotel name is required"),
          phoneNumber: yup
            .string()
            .required("Phone number is required")
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
          address: yup.string().required("Address is required"),
        });
      case "partyInvitation":
        return yup.object({
          date: yup.date().required("Date is required"),
          time: yup.string().required("Time is required"),
          address: yup.string().required("Address is required"),
          ownerHotelName: yup.string().required("Hotel name is required"),
          phoneNumber: yup
            .string()
            .required("Phone number is required")
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
        });
      default:
        return yup.object({});
    }
  };

  const validateForm = async () => {
    const schema = getValidationSchema();
    try {
      await schema.validate(
        { discount, ownerHotelName, phoneNumber, address, date, time },
        { abortEarly: false }
      );
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors: Record<string, string> = {};
      (validationErrors as yup.ValidationError).inner.forEach((error) => {
        if (error.path) {
          newErrors[error.path] = error.message;
        }
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (isValid) {
      sendBulkMessage(selectedTemplate);
    }
  };

  const renderFormFields = () => {
    switch (selectedTemplate) {
      case "discounts":
        return (
          <>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="number"
                required
                value={discount || ""}
                placeHolder="Enter Discount / Off"
                onChange={handleDiscountChange}
              />
              {errors.discount && (
                <p className="text-red-500 text-sm mt-1">{errors.discount}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="text"
                required
                value={ownerHotelName || ""}
                placeHolder="Enter Hotel Name"
                disabled
                onChange={(e) => setHotelName(e.target.value)}
              />
              {errors.ownerHotelName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ownerHotelName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="tel"
                required
                value={phoneNumber || ""}
                placeHolder="Enter Phone Number"
                onChange={handlePhoneNumberChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="text"
                required
                value={address || ""}
                placeHolder="Enter Address"
                onChange={handleAddressChange}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </>
        );
      case "roomBooking":
        return (
          <>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="date"
                required
                value={date || ''}
                onChange={handleDateChange}
                placeHolder="Select Date"

              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="text"
                required
                value={ownerHotelName || ""}
                placeHolder="Enter Hotel Name"
                disabled
                onChange={(e) => setHotelName(e.target.value)}
              />
              {errors.ownerHotelName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ownerHotelName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="tel"
                required
                value={phoneNumber || ""}
                placeHolder="Enter Phone Number"
                onChange={handlePhoneNumberChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="text"
                required
                value={address || ""}
                placeHolder="Enter Address"
                onChange={handleAddressChange}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </>
        );
      case "partyInvitation":
        return (
          <>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="date"
                required
                value={date || ""}
                placeHolder="Select Date"
                onChange={handleDateChange}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>


            <div className="mb-4">
              <Input
                classnames="py-3"
                type="time"
                required
                value={time || ""}
                placeHolder="Select Time"
                onChange={handleTimeChange}
              />
              {errors.time && (
                <p className="text-red-500 text-sm mt-1">{errors.time}</p>
              )}
            </div>



            <div className="mb-4">
              <Input
                classnames="py-3"
                type="text"
                required
                value={address || ""}
                placeHolder="Enter Address"
                onChange={handleAddressChange}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="text"
                required
                value={ownerHotelName || ""}
                placeHolder="Enter Hotel Name"
                disabled
                onChange={(e) => setHotelName(e.target.value)}
              />
              {errors.ownerHotelName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ownerHotelName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="text"
                required
                value={phoneNumber || ""}
                placeHolder="Enter Phone Number"
                onChange={handlePhoneNumberChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          </>
        );
      case "eventBooking":
        return (
          <>


            <div className="mb-4">
              <Input
                classnames="py-3"
                type="text"
                required
                value={ownerHotelName || ""}
                placeHolder="Enter Hotel Name"
                disabled
                onChange={(e) => setHotelName(e.target.value)}
              />
              {errors.ownerHotelName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ownerHotelName}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                classnames="py-3"
                type="text"
                required
                value={phoneNumber || ""}
                placeHolder="Enter Phone Number"
                onChange={handlePhoneNumberChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="w-[60%]"
              >
                <div className="pt-2">{renderFormFields()}</div>
                <div className="flex justify-start my-4">
                  <Button
                    text={loading ? <Spinner /> : "Submit"}
                    classnames="bg-green-500 hover:bg-green-600 px-8"
                    disabled={loading}
                  />
                </div>
              </form>
              <div className="absolute right-[3%] mt-[13%]">
                <MessagePreviewWindow
                  address={address}
                  discount={discount}
                  hotelName={data?.hotelName || ownerHotelName || ""}
                  phoneNumber={phoneNumber}
                  date={date}
                  time={time}
                  selectedTemplate={selectedTemplate}
                />
              </div>
              <div className="w-[10%] flex items-center -mr-[21%] absolute right-[19%] mt-[10%]">
                <RangeSlider
                  onValueChange={handleSliderValueChange}
                  value={sliderValue}
                />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>
  );
}

export default PromotionalMessage;
  