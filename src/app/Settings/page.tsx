"use client";
import React, { useEffect, useState } from "react";
import Section from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "@/app/public/assets/forgot password.svg";
import SideLayout from "@/components/SideLayout";
import Spinner from "@/components/Loader";
import useChangePassword from "@/hooks/useChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotelData } from "@/global/index";
import { hotelActions } from "@/redux/slices/hotelSlice";
import { RootState } from "@/redux/store";
import useHotelDetails from "@/hooks/useHotelDetails";
import Profile from '@/components/Profile'

function ChangePassword() {

  const [initialHotelDetails, setInitialhotelDetails] = useState("");
  const dispatch = useDispatch();
  const hotelDetail = useSelector((state: RootState) => state.hotel.details);
  const selectedOption = useSelector((state: RootState) => state.dropdown.selectedOption);
  const id = hotelDetail?._id;
  const {
    password,
    setPassword,
    newPassword,
    setNewPassword,
    handleChangePassword,
    loading,
  } = useChangePassword();
  const {
    hotelDetails,
    handleChangeHotelDetails,
    setHotelDetails,
    isLoading
  } = useHotelDetails(id as string);


  useEffect(() => {
    console.log("Yes..........")
    if (hotelDetail?.UserDetails?.hotelName) {
      setHotelDetails(hotelDetail.UserDetails.hotelName);
      setInitialhotelDetails(hotelDetail.UserDetails.hotelName);
    }
  }, [initialHotelDetails, hotelDetail]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(hotelActions.fetchHotelDetailsPending());
        const data = await fetchHotelData();
        dispatch(hotelActions.fetchHotelDetailsSuccess(data));
      } catch (error: any) {
        dispatch(hotelActions.fetchHotelDetailsFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch, isLoading]);


  console.log(hotelDetail)
  return (
    <SideLayout>
      <Profile onSelectForm={undefined} />
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col space-y-10 justify-center py-5 items-center w-full h-screen bg-gray-50">

          {
            selectedOption === "hotelDetails" && (
              <Section
                heading="Hotel Details"
                classnames="flex-col justify-start items-center w-[50%] h-[35vh] space-x-6 mt-2"
              >
                <div className="grid grid-cols-2 gap-4  z-20">
                  <div className="col-span-1">
                    <form onSubmit={handleChangeHotelDetails}>
                      <Input
                        value={hotelDetails}
                        defaultValue={initialHotelDetails}
                        required
                        placeHolder={hotelDetail?.UserDetails?.hotelName ? hotelDetail?.UserDetails?.hotelName : null}
                        label="Add Hotel Name"
                        type="text"
                        onChange={(e) => setHotelDetails(e.target.value)}
                      />
                      <div className="flex justify-start py-6 space-x-6">
                        {
                          !hotelDetail && (
                            <Button
                              text={isLoading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Submit"}
                              classnames={`py-4 px-8 bg-green-500 hover:bg-green-600 `}
                              type="submit"
                              disabled={isLoading || hotelDetail}
                            />
                          )
                        }

                        <Button
                          text="Save"
                          classnames={`py-3 px-8 bg-blue-500 hover:bg-blue-600 `}
                          type="submit"
                          disabled={isLoading}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-span-1 w-full">
                    <div className="flex justify-end items-end absolute">
                    </div>
                  </div>
                </div>
              </Section>

            )
          }

          {
            selectedOption === "resetPassword" && (
              <Section
                heading="Reset Password"
                classnames="flex-col justify-start items-center w-[50%%] h-[50vh] space-x-6 mt-10"
              >
                <div className="grid grid-cols-2 gap-4 mb-5 z-20">
                  <div className="col-span-1">
                    <form onSubmit={handleChangePassword}>
                      <Input
                        value={password}
                        required
                        placeHolder="Current Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <Input
                        classnames="pt-4"
                        value={newPassword}
                        required
                        placeHolder="New Password"
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <div className="flex justify-start pt-6">
                        <Button
                          text={loading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Please Wait...</div> : "Reset Password"}
                          classnames={`py-3 px-8 bg-green-500 hover:bg-green-600 `}
                          type="submit"
                          disabled={loading}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-span-1 w-full">
                    <div className="flex justify-end items-end absolute">
                      <Image
                        src={Hero}
                        alt="setting"
                        className="w-[100%] mt-28 -mr-10"
                      />
                    </div>
                  </div>
                </div>
              </Section>
            )
          }

          {
            selectedOption === 'purchases' && (
              <>
                <Section classnames=" text-center h-[45vh] w-[50%] " heading="Current Plan" >

                  <div className="grid grid-cols-2 justify-center items-center  -mt-[30%]">
                    <div className="col-span-1 border-b-2 border-black">
                      <div className="">
                        <p className="text-black underline font-bold">Your Plan</p>
                        <p className="text-black ">{"Standard"}</p>
                      </div>

                    </div>
                    <div className="col-span-1 border-b-2 border-black">
                      <div className="">
                        <p className="text-black underline font-semibold">Expiry Date</p>
                        <p className="text-black ">{"Standard"}</p>
                      </div>

                    </div>
                    <div className="col-span-1 text-black underline font-bold">
                      Message Left
                    </div>
                    <div className="col-span-1 text-black underline font-bold">
                      Current Plan
                    </div>

                  </div>
                </Section>
              </>
            )
          }
        </div>
      </div>
    </SideLayout>
  );
}

export default ChangePassword;
