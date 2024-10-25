// pages/api/webhook.js

import { NextApiRequest, NextApiResponse } from 'next';
import { sendErrorResponse, sendSuccessResponse } from "@/utils/responseHandler";
import crypto from 'crypto';

const RAZORPAY_KEY_SECRET = "uconLXyRqhqru3rV3cKL12Yc"; // Use secure storage in production

export default async function webhook(req: NextApiRequest, res: NextApiResponse) {
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = RAZORPAY_KEY_SECRET; // This should match the secret set in Razorpay Dashboard

    let event;

    // Validate the webhook signature
    try {
        const generatedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(JSON.stringify(req.body))
            .digest('hex');

        if (generatedSignature !== signature) {
            return sendErrorResponse(400, "Invalid signature.");
        }

        event = req.body; // This is the event sent by Razorpay
    } catch (error: any) {
        console.error("Webhook Signature Validation Error:", error.message || error);
        return sendErrorResponse(400, "Signature validation failed.");
    }

    // Handle the event
    try {
        switch (event.event) {
            case 'payment.captured':
                // Logic for successful payment
                console.log("Payment captured:", event);
                // Update your database with the payment status
                break;
            case 'payment.failed':
                // Logic for failed payment
                console.log("Payment failed:", event);
                // Handle the failed payment (e.g., update order status)
                break;
            // Handle other events as needed
            default:
                console.log(`Unhandled event: ${event.event}`);
        }

        // Acknowledge the event
        return sendSuccessResponse(200, {message:"Event processed successfully."});
    } catch (error: any) {
        console.error("Error processing webhook event:", error.message || error);
        return sendErrorResponse(500, "Internal server error.");
    }
}
