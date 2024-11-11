import Image from "next/image";
import React, { useState } from "react";
import MessageBg from "@/app/public/assets/wallaper.png";

interface MessagePreview {
  discount: number | undefined | null;
  date: string | undefined | null;
  hotelName: string;
  phoneNumber: number | undefined | null | string;
  address: string;
  selectedTemplate: string;
}

const messageTemplates: any = {
  roomBooking: (hotelName: string, date: string | undefined | null, phoneNumber: number | undefined | null, address: string) => (

    <>
      <p>Dear Customer,</p>
      <p>We are excited to offer you a limited-time discount on room bookings at <strong>{hotelName ? `${hotelName}` : <span className="text-green-700 underline font-bold">HotelName</span>}{" "}</strong>! Don't miss out—call us today to reserve your stay.</p>
      <p>📅 Offer valid until: {date ? `${date}` : <span className="text-green-700 underline font-bold">Insert Date</span>}{" "}</p>
      <p>📍 Location: {address ? `${address}` : <span className="text-green-700 underline font-bold">Address</span>}{" "}</p>
      <p>We look forward to welcoming you soon!</p>
      <p>Best regards,<br />{hotelName ? `${hotelName} Team` : <span className="text-green-700 underline font-bold">HotelName</span>}Team<br />{phoneNumber ? `${phoneNumber}` : <span className="text-green-700 underline font-bold">Phone Number</span>}{" "}</p>
    </>
  ),

  discounts: (hotelName: string, discount: number | undefined | null, phoneNumber: number | undefined | null, address: string) => (
    <p>
      🌟 <strong>
        {discount ? `${discount}% Off` : <span className="text-gray-500 underline font-bold">Discount</span>}{" "}
        Food with Advance Booking! 🌟
      </strong>
      <br />
      Book your stay at{" "}
      {hotelName || <span className="text-gray-500 underline font-bold">Hotel Name</span>}{" "}
      Hotel and enjoy{" "}
      {discount ? `${discount}% Off` : <span className="text-gray-500 underline font-bold">Discount</span>}{" "}
      on all food orders!
      <br />
      <br />
      📞 <strong>Reservations:</strong> Call{" "}
      {phoneNumber || <span className="text-gray-500 underline font-bold">Phone Number</span>}
      <br />
      📍 <strong>Address:</strong>{" "}
      {address || <span className="text-gray-500 underline font-bold">Address</span>}
      <br />
      <br />
      <strong>Don’t miss out—reserve now!</strong>
    </p>
  ),

  partyInvitation: (hotelName: string, phoneNumber: number | undefined | null) => (
    <>
      <p>Dear Customer,</p>
      <p>You’re invited to an unforgettable night of fun and entertainment! Enjoy live music, delicious food, and exciting activities all night long!</p>
      <p>🎉 Event Highlights:</p>
      <p>🎶 Live Band & DJ</p>
      <p>🍽️ Delicious Veg & Non-Veg Dishes</p>
      <p>🥤 Soft Drinks</p>
      <p>🎮 Fun Games</p>
      <p>🗓️ Date: [Insert Date]</p>
      <p>⏰ Time: [Insert Time]</p>
      <p>📍 Location: [Insert Address]</p>
      <p>Come dance, dine, and enjoy a great time with us! We can’t wait to see you there!</p>
      <p>Best regards,<br />{hotelName} Team<br />{phoneNumber}</p>
    </>
  ),

  eventBooking: (hotelName: string, phoneNumber: number | undefined | null) => (
    <>
      <p>Dear Customer,</p>
      <p>We are delighted to offer a versatile venue for all types of banquet functions and events! Whether you’re planning an intimate gathering or a grand celebration, we have everything you need to make your occasion memorable.</p>
      <p>Our Facilities Include:</p>
      <p>🏨 Rooms for Overnight Stay</p>
      <p>🍽️ Restaurant Dining</p>
      <p>🏛️ Elegant Banquet Hall</p>
      <p>🍸 Bar Area</p>
      <p>🏊‍♂️ Swimming Pool Access</p>
      <p>📸 Pre-Wedding Shoots</p>
      <p>💍 Weddings</p>
      <p>🎉 Birthdays</p>
      <p>💍 Engagements</p>
      <p>👩‍👧 Kitty Parties</p>
      <p>🌼 Haldi Ceremonies</p>
      <p>Let us help you create the perfect atmosphere for your special event. For inquiries and bookings, please contact us at {phoneNumber}</p>
      <p>Best regards,<br />{hotelName} Team</p>
    </>
  ),
};

export const MessagePreviewWindow: React.FC<MessagePreview> = ({
  discount,
  hotelName,
  date,
  phoneNumber,
  address,
  selectedTemplate,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const messageContent: any = messageTemplates[selectedTemplate]
    ? (() => {
      switch (selectedTemplate) {
        case "roomBooking":
          return messageTemplates.roomBooking(hotelName, date, phoneNumber, address);
        case "discounts":
          return messageTemplates.discounts(hotelName, discount, phoneNumber, address);
        case "partyInvitation":
          return messageTemplates.partyInvitation(hotelName, phoneNumber);
        case "eventBooking":
          return messageTemplates.eventBooking(hotelName, phoneNumber);
        default:
          return <p>No template selected</p>;
      }
    })()
    : <p>No template selected</p>;


  // Convert message content to a string to check its length
  const messageString = React.Children.toArray(messageContent)
  .map(child => {
    // Check if the child is a ReactElement (it has props)
    if (React.isValidElement(child)) {
      return child.props.children.join(' '); // Access props.children safely
    } else {
      return child; // Return the child as is if it's not a React element
    }
  })
  .join(' '); // Combine all children into a single string


  // Truncate long messages
  const maxLength = 100; // Set your desired max length~
  const isLongMessage = messageString.length > maxLength;
  const displayedMessage = isLongMessage && !isExpanded
    ? React.Children.toArray(messageContent).slice(0, maxLength) // Get the truncated message content
    : messageContent;

  return (
    <div className="flex flex-col justify-center items-center ml-10 z-0 relative">
      <div
        className="w-[75%] max-w-[370px] flex flex-col justify-start items-start text-[11.5px] rounded-xl bg-white p-4 z-10 text-left font-sans overflow-y-scroll text-black"
        style={{
          maxHeight: "300px", // Set the maximum height
          borderRadius: "0 18px 18px 18px",
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
          padding: "10px 15px",
        }}
      >
        {displayedMessage}
      </div>
      {/* Background Image */}
      <Image
        src={MessageBg}
        alt="Message background"
        className="w-[85%] -mt-[1%] max-h-[145%] absolute  rounded-2xl"
      />
    </div>
  );
};
