import { validateHotelDetails } from "@/validators/index";
import { AppError } from "@/utils/errorHandler";
import { sendSuccessResponse, sendErrorResponse } from "@/utils/responseHandler";
import HotelModel from "@/models/hotel";
import Hotel from "@/models/hotel";

// Handle POST request (Add new hotel)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { hotelName } = body;

        const validationErrors = validateHotelDetails({ hotelName });
        if (validationErrors.length > 0) {
            throw new AppError(400, validationErrors.join(", "));
        }

        const newHotel = new HotelModel({ hotelName });
        await newHotel.save();

        return sendSuccessResponse(200, {
            message: "Hotel added successfully",
        });
    } catch (error: unknown) {
        console.error("Error during hotel creation:", error);
        if (error instanceof AppError) {
            return sendErrorResponse(error.statusCode, error.message);
        }
        return sendErrorResponse(500, "An unknown error occurred");
    }
}


export async function PUT(req: Request, { params }:{params: any}) {
 
    try {
        const body = await req.json();
        const { id, hotelName } = body;

        const validationErrors = validateHotelDetails({ hotelName });
        if (validationErrors.length > 0) {
            throw new AppError(400, validationErrors.join(", "));
        }

        const hotel = await HotelModel.findById(id);
        if (!hotel) {
            throw new AppError(404, "Hotel not found");
        }

        hotel.hotelName = hotelName;
        await hotel.save();

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


export async function GET() {
    try {
       const hotels = await Hotel.findOne({});
       return sendSuccessResponse(200,hotels);
    } catch (error: unknown) {
        console.error("Error during fecthing Hotel Details:", error);
        if (error instanceof AppError) {
            return sendErrorResponse(error.statusCode, error.message);
        }
        return sendErrorResponse(500, "An unknown error occurred");
    }
}
