import Image from "next/image"
import React from "react"
import MessageBg from "@/app/public/assets/wallaper.png";

interface MessagePreview{
    discount: number | undefined | null,
    hotelName: string,
    phoneNumber: number | undefined | null,
    address: string
}

export const MessagePreviewWindow: React.FC<MessagePreview> = ({
    discount,
    hotelName,
    phoneNumber,
    address,
}) => {

return(
    <>
         <div className="flex justify-center items-center ml-10 z-0 relative">
         <div
           className="w-[90%] h-auto max-w-[350px] flex justify-center items-center text-[12px] rounded-xl bg-white p-4 z-10 text-left font-sans whitespace-normal text-black"
           style={{
             backgroundSize: "cover",
             borderRadius: "0 18px 18px 18px",
             boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
             backgroundColor: "white",
             overflowWrap: "break-word",
             wordWrap: "break-word",
             whiteSpace: "normal",
             padding: "10px 15px",
             maxWidth: "350px",
           }}
         >
           <p>
             🌟{" "}
             <strong>
               {discount ? (
                 `${discount}% Off`
               ) : (
                 <span className="text-gray-500 underline font-bold">
                   Discount
                 </span>
               )}{" "}
               Food with Advance Booking! 🌟
             </strong>
             <br />
             Book your stay at{" "}
             {hotelName || (
               <span className="text-gray-500 underline font-bold">
                 Hotel Name
               </span>
             )}{" "}
             Hotel and enjoy{" "}
             {discount ? (
               `${discount}% Off`
             ) : (
               <span className="text-gray-500 underline font-bold">
                 Discount
               </span>
             )}{" "}
             on all food orders!
             <br />
             <br />
             📞 <strong>Reservations:</strong> Call{" "}
             {phoneNumber || (
               <span className="text-gray-500 underline font-bold">
                 Phone Number
               </span>
             )}
             <br />
             📍 <strong>Address:</strong>{" "}
             {address || (
               <span className="text-gray-500 underline font-bold">
                 Address
               </span>
             )}
             <br />
             <br />
             <strong>Don’t miss out—reserve now!</strong>
           </p>
         </div>
         {/* Background Image */}
         <Image
           src={MessageBg}
           alt="Message background"
           className="w-[100%] -mt-[1%] h-[70%] absolute rounded-2xl"
         />
       </div>
       </>
)
}