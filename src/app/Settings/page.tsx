"use client";
import React, { useEffect } from "react";
import Section from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Image from "next/image";
import Hero from "@/app/public/assets/forgot password.svg";
import SideLayout from "@/components/SideLayout";
import Id from "@/app/public/assets/id (1).svg"
import Spinner from "@/components/Loader";
import useChangePassword from "@/hooks/useChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotelData } from "@/global/index"; // The function you provided
import { hotelActions } from "@/redux/slices/hotelSlice";
import { RootState } from "@/redux/store";
import useHotelDetails from "@/hooks/useHotelDetails";
import { useRouter } from "next/navigation";

function ChangePassword() {


  const dispatch = useDispatch();
  const hotelDetail = useSelector((state: RootState) => state.hotel.details);



  const id = hotelDetail._id;



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
    const fetchData = async () => {
      try {
        dispatch(hotelActions.fetchHotelDetailsPending());  // Set loading state
        const data = await fetchHotelData();  // Fetch data from the API
        dispatch(hotelActions.fetchHotelDetailsSuccess(data));  // Dispatch success
      } catch (error: any) {
        dispatch(hotelActions.fetchHotelDetailsFailure(error.message));  // Dispatch failure
      }
    };

    fetchData();  // Call the fetch function when the component mounts
  }, [dispatch, isLoading]);



  return (
    <SideLayout>
      <div className="sm:ml-64 flex justify-center">
        <div className="flex flex-col space-y-10 justify-center py-5 items-center w-full bg-gray-50">


          <Section
            heading="Hotel Details"
            classnames="flex-col justify-start items-center w-[50%] h-[35vh] space-x-6 mt-2"
          >
            <div className="grid grid-cols-2 gap-4  z-20">
              <div className="col-span-1">
                <form onSubmit={handleChangeHotelDetails}>
                  <Input
                    value={hotelDetails}
                    required
                    placeHolder={hotelDetail.hotelName ? hotelDetail?.hotelName : null}
                    label="Add Hotel Name"
                    type="text"
                    onChange={(e) => setHotelDetails(e.target.value)}  // Update state on change
                  // disabled={!!hotelDetail}  // Disable if `hotelDetail` is available
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
                      text="Edit"
                      classnames={`py-4 px-8 bg-blue-500 hover:bg-blue-600 `}
                      type="submit"
                      disabled={isLoading}
                    />
                  </div>
                </form>
              </div>
              <div className="col-span-1 w-full">
                <div className="flex justify-end items-end absolute">
                  <Image
                    src={Id}
                    alt="setting"
                    className="w-[60%] pt-20 mr-2"
                  />
                </div>
              </div>
            </div>
          </Section>


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
                      text={loading ? <div className={"flex gap-2  font-bold justify-center items-center"}><Spinner /> Submitting...</div> : "Submit"}
                      classnames={`py-4 px-8 bg-green-500 hover:bg-green-600 `}
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
                    className="w-[100%] mt-36 -mr-10"
                  />
                </div>
              </div>
            </div>
          </Section>


        </div>
      </div>
    </SideLayout>
  );
}

export default ChangePassword;
