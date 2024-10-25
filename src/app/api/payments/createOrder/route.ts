
import { sendErrorResponse, sendSuccessResponse } from "@/utils/responseHandler";
import Razorpay from "razorpay";

const RAZORPAY_KEY_ID = "rzp_test_NXP68RJv2cSe3T"; 
const RAZORPAY_KEY_SECRET = "uconLXyRqhqru3rV3cKL12Yc";
const CURRENCY = 'INR';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.amount) {
            return sendErrorResponse(400, "Amount is required.");
        }

        const amount = parseFloat(body.amount);
        if (isNaN(amount) || amount <= 0) {
            return sendErrorResponse(400, "Invalid amount. Amount must be a positive number.");
        }

        const amountInPaise = Math.round(amount * 100);

        const razorpay = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amountInPaise,
            currency: CURRENCY,
            receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`,
        };


        const order = await razorpay.orders.create(options);


        if (!order) {
            throw new Error("Order creation failed.");
        }

        return sendSuccessResponse(200, {
            message: "Order created successfully.",
            order,
        });
    } catch (error: any) {
        console.error("Razorpay Order Creation Error:", error.message || error);
        const statusCode = error.response?.status || 500;
        return sendErrorResponse(statusCode, "Error creating order: " + (error.message || "Unknown error"));
    }
}
