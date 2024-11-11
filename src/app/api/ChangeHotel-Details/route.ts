import { validateHotelDetails } from "@/validators/index";
import { AppError } from "@/utils/errorHandler";
import { sendSuccessResponse, sendErrorResponse } from "@/utils/responseHandler";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { createUserModel } from "@/models/user";
import { connectToDatabase } from "@/lib/mongodb";
import HotelModel from "@/models/hotel";

export async function PUT(req: Request, { params }: { params: any }) {
    try {



        const body = await req.json();
        const { hotelName } = body;


        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!token) {
            console.log("no token found")
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new AppError(500, "Internal Server Error: JWT Secret is not defined");
        }
        let params;

        if (token) {
            params = jwt.verify(token, secret) as JwtPayload
        }



        const email = params?.params?.email
        const dbName = params?.params?.dbName



        const validationErrors = validateHotelDetails({ hotelName });
        if (validationErrors.length > 0) {
            throw new AppError(400, validationErrors.join(", "));
        }

        // Find the user by ID and update the hotelName
        const User = createUserModel(dbName);
        console.log(await User.findOne({ email }));

        const result = await User.updateOne({ email }, { hotelName });

        if (result.modifiedCount === 0) {
            throw new AppError(404, "Hotel not found or no changes made");
        }

        return sendSuccessResponse(200, {
            message: "Hotel updated successfully",
        }); 
    } catch (error: unknown) {
        console.error("Error during hotel update:", error);
        if (error instanceof AppError) {
            return sendErrorResponse(error.statusCode, error.message);
        }
        return sendErrorResponse(500, "An unknown error occurred");
    }
}

export async function GET(req: Request) {
    try {

        connectToDatabase()
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!token) {
            console.log("no token found")
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new AppError(500, "Internal Server Error: JWT Secret is not defined");
        }
        let params;

        if (token) {
            params = jwt.verify(token, secret) as JwtPayload
        }

        const id = params?.params?.id

        const hotelID = params?.params?.id
        const email = params?.params?.email
        const dbName = params?.params?.dbName
        const User = createUserModel(dbName)
        const user = await HotelModel.findOne({ email })
        const userDetails = await User.findOne({ _id: hotelID })

  
        return sendSuccessResponse(200, {
            HotelDetials: user, UserDetails: userDetails
        });
    } catch (error: unknown) {
        console.error("Error during fecthing Hotel Details:", error);
        if (error instanceof AppError) {
            return sendErrorResponse(error.statusCode, error.message);
        }
        return sendErrorResponse(500, "An unknown error occurred");
    }
}
