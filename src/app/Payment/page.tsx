'use client'
import React, { useEffect, useState } from "react";
import { axiosPost } from "@/utils/axiosUtility";
import Hero from "../../app/public/assets/Logo.png";
import ThankYouOverlay from "@/components/Thankyou";
import { toast } from "sonner";

// Type definitions
interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface PlanFeatures {
  planType: "Basic" | "Premium";
  messageLimit: number;
  customerLimit: number;
  templates: number;
}

interface CreateOrderResponse {
  key_id: any;
  orderId: any;
  data: {
    key_id: string;
    orderId: string;
  };
}

interface PlanCardProps {
  title: string;
  description: string;
  price: number;
  features: string[];
  onPayment: () => Promise<void>;
  loading: boolean;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => toast.error("Failed to load payment gateway");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const getPlanFeatures = (amount: number): PlanFeatures => ({
    planType: amount === 10000 ? "Basic" : "Premium",
    messageLimit: amount === 10000 ? 500 : 2000,
    customerLimit: amount === 10000 ? 50 : 500,
    templates: amount === 10000 ? 3 : 8,
  });

  const handlePayment = async (planAmount: number, userId: string, planType: string) => {
    console.log(userId);
    console.log(planAmount);
    
    
    if (!razorpayLoaded) {
      toast.error("Payment gateway not loaded. Please refresh the page.");
      return;
    }

    setLoadingPlan(planType);

    try {
      const { data } = await axiosPost<CreateOrderResponse, any>("http://localhost:3000/api/payment/create-order", {
        amount: planAmount,
        currency: "INR",
      });

      if (!data?.data?.key_id || !data?.data?.orderId) {
        throw new Error("Invalid response from server");
      }

      const razorpayOptions = {
        key: data.data.key_id,
        amount: planAmount * 100,
        currency: "INR",
        name: "GoodPegg Touch",
        description: `${planType} Plan Subscription`,
        image: Hero.src,
        order_id: data.data.orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            // Verify payment
            await axiosPost("http://localhost:3000/api/payment/verify-payment", {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });

            // Save transaction
            await axiosPost("http://localhost:3000/api/payment/save-transaction", {
              paymentData: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount: planAmount,
                status: 'success',
                userId,
              }
            });

            // Activate plan
            await axiosPost("http://localhost:3000/api/user/activate-plan", {
              userId,
              planDetails: getPlanFeatures(planAmount)
            });

            setShowThankYou(true);
            toast.success("Payment successful!");
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
            console.error("Payment verification error:", error);
          }
        },
        prefill: {
          name: "User",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.on('payment.failed', (response: any) => {
        toast.error("Payment failed. Please try again.");
        console.error("Payment failed:", response);
      });
      
      rzp.open();
    } catch (error) {
      toast.error("Failed to initialize payment. Please try again.");
      console.error("Payment initialization error:", error);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="bg-white justify-evenly h-screen">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Choose the Plan That Best Fits Your Needs
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl">
            We offer a variety of plans for purchasing marketing and utility messages tailored to your business needs.
          </p>
        </div>
        <h1 className="text-4xl mb-5 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-red-500 to-yellow-700 text-end mr-36">
          Recommended
        </h1>

        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 justify-center items-center">
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
              "Templates: Unlimited",
              "Upload CSV File",
              "24/7 Technical Support",
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

const PlanCard: React.FC<PlanCardProps> = ({ 
  title, 
  description, 
  price, 
  features, 
  onPayment, 
  loading 
}) => {
  return (
    <div className="flex flex-col p-6 mx-auto max-w-sm text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8">
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
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onPayment}
        className={`text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${loading ? "cursor-not-allowed opacity-70" : ""}`}
        disabled={loading}
      >
        {loading ? "Processing..." : "Get Started"}
      </button>
    </div>
  );
};