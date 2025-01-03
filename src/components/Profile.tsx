"use client";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setOption } from "@/redux/slices/dropDownSlice";
import { useRouter } from "next/navigation";

function DropdownMenu({ onSelectForm }: { onSelectForm: any }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref to the dropdown menu container

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (formType: string) => {
    router.push("/Settings");
    dispatch(setOption(formType)); // Dispatch the selected option
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Close dropdown if the click is outside
      }
    };

    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="font-[sans-serif] w-max mx-auto flex absolute right-0" ref={dropdownRef}>
      <button
        type="button"
        id="dropdownToggle"
        onClick={toggleDropdown}
        className="px-4 py-2 flex items-center justify-center rounded-full text-[#333] text-sm transition-transform transform active:scale-95"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen ? "true" : "false"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-12">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </button>

      {isDropdownOpen && (
        <ul className="absolute left-0 transform -translate-x-full bg-white py-2 z-[1000] w-max rounded-tr-none mt-14 ml-10 shadow-2xl rounded-lg max-h-96 overflow-auto transition-all duration-300 ease-in-out">
          <li
            onClick={() => handleSelect("hotelDetails")}
            className="px-5 text-start hover:bg-gray-200 font-semibold items-center flex justify-start py-2 text-[#333] text-sm cursor-pointer transition-colors duration-200"
          >
            Update's Hotel Details
          </li>
          <li
            onClick={() => handleSelect("resetPassword")}
            className="px-5 hover:bg-gray-200 font-semibold flex items-center justify-start py-2 text-[#333] text-sm cursor-pointer transition-colors duration-200"
          >
            Reset Password
          </li>
          <li
            onClick={() => handleSelect("purchases")}
            className="px-5 hover:bg-gray-200 font-semibold flex items-center justify-start py-2 text-[#333] text-sm cursor-pointer transition-colors duration-200"
          >
            Purchases
          </li>
          <li
            onClick={() => handleSelect("top-ups")}
            className="px-5 hover:bg-gray-200 font-semibold flex py-2 items-center text-[#333] text-sm cursor-pointer transition-colors duration-200"
          >
            Top-Ups
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;