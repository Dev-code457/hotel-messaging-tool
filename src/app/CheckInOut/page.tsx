'use client'
import React, { useEffect, useState } from "react";
import Section from "../../components/Layout";
import Input, { Checkbox } from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "../public/assets/CheckIn.svg";
import SideLayout from "@/components/SideLayout";
import { useDispatch, useSelector } from "react-redux";
import { useCheckInOut } from "@/hooks/useCheckInOut";
import Spinner from "@/components/Loader";
import Profile from "@/components/Profile";
import { RootState } from "@/redux/store";
import { hotelActions } from "@/redux/slices/hotelSlice";
import { fetchHotelData } from "@/global";
import * as yup from "yup";

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

  const [errors, setErrors] = useState<Record<string, string>>({});
const [hotelDetail, setHotelDetails] = useState<any>();
const [userDetail, setUserDetails] = useState<any>();



  const getValidationSchema = () => {
    const baseSchema = {
      phoneNumber: yup
        .string()
        .required("Phone Number is required")
        .matches(/^\d{10}$/, "Phone Number must be exactly 10 digits"),
    };

    if (isPromotionalList) {
      return yup.object({
        ...baseSchema,
        userSpending: yup
          .number()
          .required("User Spending Amount is required")
          .positive("User Spending must be positive")
          .typeError("User Spending must be a number"),
      });
    }

    return yup.object(baseSchema);
  };

  const validateForm = async () => {
    const schema = getValidationSchema();
    try {
      await schema.validate(
        { phoneNumber, userSpending },
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




  const handleCheckInWithValidation = async () => {
    const isValid = await validateForm();
    if (isValid) {
      handleCheckIn(isPromotionalList);
    }
  };

  const handleCheckOutWithValidation = async () => {
    const isValid = await validateForm();
    if (isValid) {
      handleCheckOut(isPromotionalList);
    }
  };

  const handleCheckboxChange = () => {
    setIsPromotionalList(!isPromotionalList);
    setErrors((prev) => ({ ...prev, userSpending: "" }));
    if (isPromotionalList) {
      setUserSpending("");
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching hotel data...");
      try {
        const data = await fetchHotelData();
        console.log("Hotel data fetched:", data);
        setHotelDetails(data);
        setUserDetails(data);
      } catch (error: any) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Current state: hotelDetail:", hotelDetail);
  console.log("Current state: userDetail:", userDetail);

  if (!userDetail && !hotelDetail) {
    console.log("Loading spinner displayed as no data is available.");
    return (
      <div className="h-screen bg-white bg-transparent flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  }

  console.log("Rendering Check In/Out component...");




  return (
    <SideLayout>
      <Profile onSelectForm={undefined} />
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col h-screen justify-center items-center w-full bg-gray-50">
          <h1 className="text-4xl text-black font-bold mb-14">
            Welcome{" "}
            <span className="text-blue-600">
              {hotelDetail?.data?.hotel?.hotelName}
            </span>
            <span className="text-black">!</span>
          </h1>
          <Section
            heading="Check In & Check Out"
            classnames={`flex-col justify-start w-[65%] space-x-4 ${isPromotionalList ? "h-[50vh]" : "h-[35vh]"
              }`}
          >
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3">
                <form
                  className={`w-[100%] ${isPromotionalList ? "-mt-[10%]" : "mt-16"
                    }`}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="mb-4">
                    <Input
                      classnames="p"
                      type="tel"
                      value={phoneNumber}
                      required
                      placeHolder="Enter Phone Number"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>

                  {isPromotionalList && (
                    <div className="mb-4">
                      <Input
                        classnames="py-3"
                        type="number"
                        value={userSpending}
                        placeHolder="User Spending Amount"
                        onChange={(e) => setUserSpending(e.target.value)}
                      />
                      {errors.userSpending && (
                        <p className="text-red-500 text-sm mt-1">{errors.userSpending}</p>
                      )}
                    </div>
                  )}

                  <Checkbox
                    checked={isPromotionalList}
                    classnames="-mb-10 py-5"
                    label="Want to add this Number to the Promotional List?"
                    onChange={handleCheckboxChange}
                  />
                  <div className="flex justify-start space-x-5 mt-8 mb-4">
                    <Button
                      text={
                        loadingCheckIn ? (
                          <div className="flex gap-2 font-bold justify-center items-center">
                            <Spinner /> Sending...
                          </div>
                        ) : (
                          "Send Check In Message"
                        )
                      }
                      classnames={`bg-green-500 hover:bg-green-600 py-3 ${!userDetail?.data?.User?.planType ? "cursor-not-allowed" : "cursor-pointer"}`}
                      type="submit"
                      onClick={handleCheckInWithValidation}
                      disabled={!userDetail?.data?.User?.planType || loadingCheckIn}
                    />
                    <Button
                      text={
                        loadingCheckOut ? (
                          <div className="flex gap-2 font-bold justify-center items-center">
                            <Spinner /> Sending...
                          </div>
                        ) : (
                          "Send Check Out Message"
                        )
                      }
                      classnames={`bg-blue-500 hover:bg-blue-600 py-3 ${!userDetail?.data?.User?.planType ? "cursor-not-allowed" : "cusrsor-pointer"}`}
                      type="submit"
                      onClick={handleCheckOutWithValidation}
                      disabled={!userDetail?.data?.User?.planType || loadingCheckOut}
                    />
                  </div>
                </form>
              </div>

              <div className="col-span-2 flex justify-center items-center">
                <Image
                  src={Hero}
                  alt="Check In & Check Out"
                  className={`h-[100%] ${isPromotionalList ? "-mb-36 w-[100%]" : "-mb-20"
                    }`}
                />
              </div>
            </div>
          </Section>
        </div>
      </div>
    </SideLayout>
  );
}

export default CheckInOut;