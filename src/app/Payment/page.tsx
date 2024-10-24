"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../../app/public/assets/Logo.png";


interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    handler: (response: any) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    theme: {
        color: string;
    };
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function Payment() {
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null); // For error handling

    useEffect(() => {
        const loadRazorpayScript = () => {
            if (!window.Razorpay) {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.async = true;
                script.onload = () => {
                    console.log("Razorpay script loaded");
                    setRazorpayLoaded(true);
                };
                script.onerror = () => {
                    console.error("Failed to load Razorpay script");
                    setError("Failed to load payment gateway. Please try again.");
                };
                document.body.appendChild(script);
            } else {
                setRazorpayLoaded(true);
            }
        };

        loadRazorpayScript();
    }, []);

    const handlePayment = async () => {
        if (!razorpayLoaded) {
            console.error("Razorpay script not loaded yet");
            return;
        }

        setLoading(true);
        setError(null); // Reset error state

        try {
            const amount = 12000; // Amount in INR
            const { data } = await axios.post("/api/payments/createOrder", {
                amount,
                currency: "INR",
            });

            const options: RazorpayOptions = {
                key: "rzp_test_NXP68RJv2cSe3T",
                amount: amount * 100, // Amount is in paise
                currency: "INR",
                name: "GoodPegg Touch",
                description: "Test Transaction",
                image: Hero.src, // Correct path to the logo
                order_id: data.order.id,
                handler: async (response) => {
                    console.log("Payment Response:", response);
                    // Verify payment and handle post-payment logic here
                    // Example: await verifyPayment(response);
                },
                prefill: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error during payment", error);
            setError("Payment initiation failed. Please try again."); // Set error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                        Choose the Plan That Best Fits Your Needs
                    </h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl">
                        We offer a variety of plans for purchasing marketing and utility messages tailored to your business needs. Below is our showcase of available plans to help you find the perfect fit. Good luck!
                    </p>
                </div>
                {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    <PlanCard
                        title="Basic"
                        description="The perfect option for small business outlets and carts."
                        price={10000}
                        features={[
                            "500 Marketing Messages",
                            "500 Utility Messages",
                            "Customers Limit: 50 Customers",
                            "Auto Add to Promotions",
                            "Templates: 3",
                            "Upload CSV File",
                            "27/4 Technical Support",
                        ]}
                        onPayment={handlePayment}
                    />
                    <PlanCard
                        title="Standard"
                        description="Ideal for medium-scale businesses like cafes and hotels."
                        price={12000}
                        features={[
                            "1000 Marketing Messages",
                            "1000 Utility Messages",
                            "Customers Limit: 100 Customers",
                            "Auto Add to Promotions",
                            "Templates: 5",
                            "Upload CSV File",
                            "27/4 Technical Support",
                        ]}
                        onPayment={handlePayment}
                    />
                    <PlanCard
                        title="Premium"
                        description="Best suited for large enterprises with advanced requirements."
                        price={15000}
                        features={[
                            "Unlimited Marketing Messages",
                            "Unlimited Utility Messages",
                            "Customers Limit: Unlimited",
                            "Auto Add to Promotions",
                            "Templates: Unlimited",
                            "Upload CSV File",
                            "27/4 Technical Support",
                        ]}
                        onPayment={handlePayment}
                    />
                </div>
            </div>
        </section>
    );
}

const PlanCard = ({ title, description, price, features, onPayment,loading }: any) => {
    return (
        <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8">
            <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
            <p className="font-light text-gray-500 sm:text-lg">{description}</p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">₹ {price.toLocaleString()}</span>
                <span className="text-gray-500 dark:text-gray-400">/year</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={onPayment}
                disabled={loading}
                className="text-black bg-gray-200 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-primary-900"
            >
                {loading ? "Processing..." : "Get Started"}
            </button>
        </div>
    );
}
