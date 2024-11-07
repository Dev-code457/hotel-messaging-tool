"use client";
import { useState } from "react";
import { UseDispatch } from "react-redux";
import { setOption } from "@/redux/slices/dropDownSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

function DropdownMenu({ onSelectForm }: { onSelectForm: any }) {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleSelect = (formType: any) => {
        router.push("/Settings")
        dispatch(setOption(formType)); // Di
        setIsDropdownOpen(false); // Close the dropdown after selection
    };
    return (
        <div className="font-[sans-serif] w-max mx-auto  flex absolute right-0">
            <button
                type="button"
                id="dropdownToggle"
                onClick={toggleDropdown}
                className="px-4 py-2 flex items-center justify-center rounded-full text-[#333] text-sm"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-12">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>


            </button>

            {isDropdownOpen && (
                <ul className="absolute left-0 transform -translate-x-full   bg-white py-2 z-[1000] w-max  rounded-tr-none mt-14 ml-10 shadow-2xl rounded-lg max-h-96 overflow-auto">
                    <li onClick={() => handleSelect("hotelDetails")} className="px-5 text-start hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-4 h-4 mr-3"
                            viewBox="0 0 512 512"
                        >
                            <path d="M337.711 241.3a16 16 ..." />
                        </svg>
                        Update's Hotel Details
                    </li>
                    <li onClick={() => handleSelect("resetPassword")} className="px-5 hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-4 h-4 mr-3"
                            viewBox="0 0 512 512"
                        >
                            <path d="M197.332 170.668h-160C16.746 ..." />
                        </svg>
                        Reset Password
                    </li>
                    <li onClick={() => handleSelect("purchases")} className="px-5 hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-4 h-4 mr-3"
                            viewBox="0 0 6.35 6.35"
                        >
                            <path d="M3.172.53a.265.266 ..." />
                        </svg>
                        Purchases
                    </li>
                    <li onClick={() => handleSelect("top-up")} className="px-5 hover:bg-gray-100 text-[#333] text-sm cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="w-4 h-4 mr-3"
                            viewBox="0 0 6.35 6.35"
                        >
                            <path d="M3.172.53a.265.266 ..." />
                        </svg>
                        Top-Ups
                    </li>
                </ul>
            )}
        </div>
    );
}

export default DropdownMenu;
