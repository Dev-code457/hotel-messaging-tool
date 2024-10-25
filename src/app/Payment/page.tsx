"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../../app/public/assets/Logo.png";
import crypto from "crypto";
import { axiosPost, axiosPut } from "@/utils/axiosUtility";
import ThankYouOverlay from "@/components/Thankyou";

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
    const [showThankYou, setShowThankYou] = useState(false);
    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

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

    const verifyPayment = async (response: any) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", "uconLXyRqhqru3rV3cKL12Yc")
            .update(body)
            .digest("hex");
        return expectedSignature === razorpay_signature;
    };

    const saveTransaction = async (paymentData: any) => {
        try {
            const response = await axiosPut("/api/payments/saveTransaction", { paymentData });
            console.log("Transaction saved successfully:", response);
            setShowThankYou(true);
        
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    const activatePlanFeatures = async (userId: string, planDetails: any) => {
        await axios.post("/api/users/activatePlan", { userId, planDetails });
    };

    const handlePayment = async (planAmount: number) => {
        if (!razorpayLoaded) {
            console.error("Razorpay script not loaded yet");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const amount = planAmount;
            const { data } = await axios.post("/api/payments/createOrder", {
                amount,
                currency: "INR",
            });
            console.log(data);

            const options: RazorpayOptions = {
                key: "rzp_test_NXP68RJv2cSe3T",
                amount: amount * 100,
                currency: "INR",
                name: "GoodPegg Touch",
                description: "Test Transaction",
                image: Hero.src,
                order_id: data.order.id,
                handler: async (response) => {
                    console.log("Payment Response:", response);

                    const isVerified = await verifyPayment(response);
                    if (isVerified) {
                        await saveTransaction({
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            amount: planAmount,
                            status: 'success',
                            userId: response._id,
                        });


                        await activatePlanFeatures('currentUserId', { planAmount });


                        alert("Payment successful! Your plan has been activated.");
                    } else {
                        alert("Payment verification failed. Please contact support.");
                    }
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
            setError("Payment initiation failed. Please try again.");
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
                        onPayment={() => handlePayment(10000)}
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
                        onPayment={() => handlePayment(12000)}
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
                        onPayment={() => handlePayment(15000)}
                    />
                </div>
            </div>
            {showThankYou && <ThankYouOverlay onClose={() => setShowThankYou(false)} />}
        </section>
    );
}

const PlanCard = ({ title, description, price, features, onPayment, loading }: any) => {
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
                className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Choose Plan'}
            </button>
        </div>
    );
}
