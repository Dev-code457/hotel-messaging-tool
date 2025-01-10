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
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function ChangePassword() {

  const [initialHotelDetails, setInitialhotelDetails] = useState("");
  const [hotelDetail, setHotelDetail] = useState<any>();
  const [userDetail, setUserDetails] = useState<any>();
  const router = useRouter()
  const pathName = usePathname()




  const selectedOption = useSelector((state: RootState) => state.dropdown.selectedOption);
  useEffect(() => {


    const fetchData = async () => {
      try {
        const data = await fetchHotelData();

        setHotelDetail(data);
        setUserDetails(data)

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, [pathName]);







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
    if (hotelDetail?.data?.User?.hotelName) {
      setInitialhotelDetails(hotelDetail?.data?.User?.hotelName);
    }
  }, [initialHotelDetails, hotelDetail]);

  const user = hotelDetail?.data?.User
  console.log(user);

  const handleUpgrade = () => {
    router.push("/Payment");
  }



  if (!hotelDetail) {
    return (
      <div className="h-screen bg-white  bg-transparent flex flex-col justify-center items-center">
        <Spinner />

      </div>
    );
  }


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
                classnames="flex-col justify-start items-center w-[50%] h-[27vh] space-x-6 mt-2"
              >
                <div className="grid grid-cols-2 gap-4  z-20">
                  <div className="col-span-1">
                    <form onSubmit={handleChangeHotelDetails}>
                      <Input
                        // value={hotelDetails}
                        defaultValue={initialHotelDetails}
                        required
                        placeHolder={hotelDetail?.data?.User?.hotelName ? hotelDetail?.data?.User?.hotelName : null}
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
                classnames="flex-col justify-start items-center w-[50%] h-[38vh] space-x-6 mt-10"
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
                        className="w-[80%] mt-32 -mr-16"
                      />
                    </div>
                  </div>
                </div>
              </Section>
            )
          }



          {(selectedOption === 'purchases' && user.planType) ? (
            <Section
              classnames="text-center h-auto w-[90%] max-w-4xl mx-auto bg-white p-16 rounded-lg shadow-2xl"
              heading="Current Plan"
            >
              <div className="grid grid-cols-2 gap-10 justify-center items-start">
                {/* User Plan Section */}
                <div className="col-span-1 border-b-[1px] border-gray-300 pb-6">
                  <h3 className="text-2xl font-semibold text-green-600 mb-3">Your Plan</h3>
                  <p className="text-lg font-bold text-black">{user.planType}</p>
                </div>

                {/* Expiry Date Section */}
                <div className="col-span-1 border-b-[1px] border-gray-300 pb-6">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-3">Templates</h3>
                  <p className="text-lg font-bold text-black">{user.templates}</p>
                </div>


                {/* Messages Left Section */}
                <div className="col-span-1">
                  <h3 className="text-2xl font-semibold text-blue-600 mb-3">Messages Left</h3>
                  <p className="text-lg font-bold text-black">{user.messageLimit}</p>
                </div>

                {user.planType === "Basic" && (
                  <div className="col-span-1 ">
                    <h3 className="text-2xl font-semibold text-green-600 mb-3">Upgrade Plan</h3>
                    <Button
                      text="Upgrade Now"
                      classnames="py-3 px-8 bg-blue-500 hover:bg-blue-600"
                      type="button"
                      disabled={false}
                      onClick={() => handleUpgrade()}
                    />
                  </div>
                )}

                {user.planType === "Premium" && (
                  <div className="col-span-1 ">
                    <h3 className="text-2xl font-semibold text-green-600 mb-3">Customer's Upload Limit</h3>
                    <p className="text-lg font-bold text-black">{user.customerLimit}</p>
                  </div>
                )}

              </div>


              {/* Conditional Message */}
              {!user.planType ? (
                <p className="mt-8 text-gray-500 text-lg">
                  You currently don't have a plan. Please purchase a relevant plan to get started.
                </p>
              ) : user.PlanType === "Basic" ? (
                <p className="mt-8 text-gray-500 text-lg">
                  You are on the <strong className="text-blue-500">Basic Plan</strong>. Consider upgrading for
                  more features and benefits.
                </p>
              ) : null}
            </Section>
          ) :
            (selectedOption === "purchases") ?
              <Section
                classnames="text-center h-auto w-[90%] max-w-4xl mx-auto bg-white p-16 rounded-lg shadow-2xl"
                heading="Current Plan"
              >



                {/* Conditional Message */}
                {!user.planType && (
                  <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow-lg max-w-xl mx-auto text-center">
                    <p className="text-red-600 text-2xl font-semibold mb-2">
                      You currently don't have a plan.
                    </p>
                    <p className="text-gray-800 text-lg">
                      Please purchase a relevant plan to get{' '}
                      <span className="underline text-blue-600 font-medium hover:text-blue-800 transition-colors" onClick={() => router.push("/Payment")}>
                        started
                      </span>.
                    </p>
                  </div>
                )}

              </Section> : null
          }




          {
            selectedOption === 'top-ups' && (
              <>
                <Section classnames="text-center h-auto p-10 w-1/2" heading="Top-Ups">
                  <div className="bg-white border border-green-600 p-6 rounded-lg shadow-lg max-w-xl mx-auto text-center">
                    <p className="text-blue-600 text-2xl font-semibold mb-2">
                      Coming Soon...
                    </p>
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