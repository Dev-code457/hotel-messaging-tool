"use client"; // This ensures that the component is treated as a client-side component

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
import * as yup from "yup"

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

  const schema = yup.object({
    phoneNumber: yup.string().required('Phone Number is required').min(10, "PhoneNumber must be 10 digits long"),
    userSpending: yup.number().when('isPromotionalList', (isPromotionalList, schema) =>
      isPromotionalList ? schema.required('User Spending Amount is required') : schema
    )
  })

  const dispatch = useDispatch();
  const hotelDetail = useSelector((state: RootState) => state.hotel.details);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(hotelActions.fetchHotelDetailsPending());
        const data = await fetchHotelData();
        console.log(data, "Fetched hotel data");

        dispatch(hotelActions.fetchHotelDetailsSuccess(data));
      } catch (error: any) {
        dispatch(hotelActions.fetchHotelDetailsFailure(error.message));
      }
    };

    fetchData();
  }, []);

  console.log(hotelDetail?.data?.hotel?.hotelName, "Hotel details fetched");


  if (!hotelDetail?.data?.hotel?.hotelName) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <Spinner />
      </div>
    );
  }

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
                  className={`w-[100%]${isPromotionalList ? "-mt-[30%}" : "mt-16"
                    }`}
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    classnames="p"
                    type="tel"
                    value={phoneNumber}
                    required
                    placeHolder="Enter Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  
                  {isPromotionalList && (
                    <Input
                      classnames="py-3"
                      type="number"
                      value={userSpending}
                      placeHolder="User Spending Amount"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserSpending(e.target.value)
                      }
                    />
                  )}

                  <Checkbox
                    checked={isPromotionalList} // Use the hook's checkbox state
                    classnames="-mb-10 py-5"
                    label="Want to add this Number to the Promotional List?"
                    onChange={handleCheckboxChange}
                  />
                  <div className="flex justify-start space-x-5 mt-8 mb-4">
                    <Button
                      text={
                        loadingCheckIn ? (
                          <div
                            className={
                              "flex gap-2 font-bold justify-center items-center"
                            }
                          >
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
                          <div
                            className={
                              "flex gap-2 font-bold justify-center items-center"
                            }
                          >
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