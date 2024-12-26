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
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null); // Track loading for specific plan

    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRazorpayScript = () => {
            if (!window.Razorpay) {
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.async = true;
                script.onload = () => setRazorpayLoaded(true);
                script.onerror = () => setError("Failed to load payment gateway. Please try again.");
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

            setShowThankYou(true);
        } catch (error) {
            console.error("Error saving transaction:", error);
            setError("Failed to save transaction. Please contact support.");
        }
    };

    const activatePlanFeatures = async (userId: string, planDetails: any) => {
        try {
            await axiosPost("/api/user/activatePlan", { userId, planDetails });
        } catch (error) {
            console.error("Error activating plan features:", error);
            setError("Failed to activate plan. Please contact support.");
        }
    };
    const handlePayment = async (planAmount: number, userId: string, planType: string) => {
        if (!razorpayLoaded) {
            setError("Payment gateway not loaded. Please try again later.");
            return;
        }

        setLoadingPlan(planType); // Set loading state for selected plan

        try {
            const { data } = await axios.post("/api/payments/createOrder", {
                amount: planAmount,
                currency: "INR",
            });

            const options: RazorpayOptions = {
                key: "rzp_test_NXP68RJv2cSe3T",
                amount: planAmount * 100,
                currency: "INR",
                name: "GoodPegg Touch",
                description: "Test Transaction",
                image: Hero.src,
                order_id: data.order.id,
                handler: async (response) => {
                    const isVerified = await verifyPayment(response);
                    if (isVerified) {
                        await saveTransaction({
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            amount: planAmount,
                            status: 'success',
                            userId: userId,
                        });
                        await activatePlanFeatures(userId, {
                            planType,
                            messageLimit: planAmount === 10000 ? 500 : planAmount === 12000 ? 1000 : 2000,
                            customerLimit: planAmount === 10000 ? 50 : planAmount === 12000 ? 300 : 500,
                            templates: planAmount === 10000 ? 3 : planAmount === 12000 ? 5 : 8,
                        });

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
            setLoadingPlan(null); // Clear loading state after completion
        }
    };


    return (
        <section className="bg-white justify-evenly">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12  ">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
                        Choose the Plan That Best Fits Your Needs
                    </h2>
                    <p className="mb-5 font-light text-gray-500 sm:text-xl">
                        We offer a variety of plans for purchasing marketing and utility messages tailored to your business needs. Below is our showcase of available plans to help you find the perfect fit.
                    </p>
                </div>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 via-red-500 via-orange-400 to-yellow-500 text-end mr-28">
                    Recommended
                </h1>




                <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2  justify-center items-center">
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
                            "24/7 Technical Support",
                        ]}
                        onPayment={() => handlePayment(10000, "user_id_123", "Basic")}
                        loading={loadingPlan === "Basic"}
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
                            "24/7 Technical Support",
                        ]}
                        onPayment={() => handlePayment(15000, "user_id_123", "Premium")}
                        loading={loadingPlan === "Premium"}
                    />
                </div>

            </div>
            {showThankYou && <ThankYouOverlay onClose={() => setShowThankYou(false)} />}
        </section>
    );
}

const PlanCard = ({ title, description, price, features, onPayment, loading }: any) => {
    return (
        <div className="flex flex-col p-6 mx-auto max-w-sm text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8">

            <h3 className="mb-4 text-2xl font-semibold">{title}</h3>
            <p className="font-light text-gray-500 sm:text-lg">{description}</p>
            <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">₹ {price.toLocaleString()}</span>
                <span className="text-gray-500 dark:text-gray-400">/year</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
                {features.map((feature: string, index: React.Key) => (
                    <li key={index} className="flex items-center space-x-3">
                        <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={onPayment}
                className={`text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? "cursor-not-allowed" : ""
                    }`}
                disabled={loading}
            >
                {loading ? "Processing..." : "Get Started"}
            </button>
        </div>
    );
};