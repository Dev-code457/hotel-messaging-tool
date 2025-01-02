import React from "react";
import Image from "next/image";
import gif from "@/app/public/assets/Animation - 1731931073963 (1).gif"
export default function Confirmation({ isOpen, onClose, onConfirm }: any) {
    if (!isOpen) return null;

    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-gray-900 text-white rounded-lg shadow-lg">
                    <button
                        type="button"
                        className="absolute top-3 right-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg p-2"
                        onClick={onClose} // Close modal
                    >
                        <svg
                            className="w-4 h-4"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-14 text-yellow-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>

                        <h3 className="mb-5 text-lg font-normal text-gray-300">
                            Are you sure you want to log out?
                        </h3>
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    onConfirm(); // Confirm logout
                                    onClose(); // Close modal
                                }}
                                className="bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Yes, I'm sure
                            </button>
                            <button
                                onClick={onClose} // Close modal without action
                                className="ml-3 text-gray-300 border border-gray-600 hover:bg-gray-800 rounded-lg px-5 py-2.5 text-sm"
                            >
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export function Warning({ isOpen, onClose, onConfirm }: any) {
    if (!isOpen) return null;
    return (
        <div
            id="popup-modal"
            tabIndex={-1}
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
            <div className="relative  w-full max-w-md max-h-full">
                <div className="relative bg-gray-900 text-white rounded-lg shadow-lg">
                    <button
                        type="button"
                        className="absolute top-3 right-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg p-2"
                    // onClick={onClose} // Close modal
                    >

                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 text-center">
                        <svg
                            className="mx-auto mb-4 text-yellow-500 w-12 h-12"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-300">
                            You spent all of your free 50 message credits!
                        </h3>
                        <p className="mb-5 text-gray-400">
                            Kindly purchase one of our plans to continue our service.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    onConfirm(); // Redirect to purchase plans
                                    onClose(); // Close modal
                                }}
                                className="bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Purchase Plan
                            </button>
                            <button
                                onClick={onClose} // Close modal without action
                                className="ml-3 text-gray-300 border border-gray-600 hover:bg-gray-800 rounded-lg px-5 py-2.5 text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}