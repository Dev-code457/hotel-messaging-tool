import { sendErrorResponse, sendSuccessResponse } from "@/utils/responseHandler";
import Razorpay from "razorpay";

export async function POST(req: Request) {
    const body = await req.json();
    
    const razorpay = new Razorpay({
        key_id: "rzp_test_NXP68RJv2cSe3T",
        key_secret: "uconLXyRqhqru3rV3cKL12Yc",
    });

    if (!body.amount) {
        return sendErrorResponse(400,"Amount is required." );
    }

    const amountInPaise = body.amount * 100;

    try {
        const options = {
            amount: amountInPaise,
            currency: 'INR',
            receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`,
        };

        const order = await razorpay.orders.create(options);
        
        return sendSuccessResponse(200, {
            message: "Success",
            order,
        });
    } catch (error: any) {
        console.error("Razorpay Order Creation Error:", error);
        return sendErrorResponse(500, error);
    }
}
