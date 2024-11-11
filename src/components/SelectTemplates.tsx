
import React from "react";

interface SelectDefaultProps {
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
  selectedTemplate: string;
}

export function SelectDefault({ setSelectedTemplate, selectedTemplate }: SelectDefaultProps) {
  const templates = [
    { id: 1, name: "Discounts", key: "discounts" },
    { id: 2, name: "Room Bookings", key: "roomBooking" },
    { id: 3, name: "Event Organisation", key: "eventBooking" },
    { id: 4, name: "Party Planning", key: "partyInvitation" },
  ];

  return (
    <nav className="block w-full max-w-screen-lg mx-auto text-black lg:px-8 lg:py-3  mb-10">
      <div className="container flex flex-wrap items-center justify-around mx-auto text-black">
        <p

          className="mr-4 block  text-base text-black font-semibold"
        >
          Templates
        </p>
        <div className="hidden lg:block">
          <ul className="flex flex-col  mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {templates.map((template) => (
              <li key={template.id} className="flex items-center p-1 text-xs ">
                <a
                  href="#"
                  className={`flex items-center transition-colors duration-300 rounded-lg p-2 ${selectedTemplate === template.key
                    ? "bg-black text-white"
                    : "text-black"
                    }`}
                  onClick={() => setSelectedTemplate(template.key)}
                >
                  {template.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
          type="button"
          aria-label="Menu"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </span>
        </button>
      </div>
    </nav>
  );
}
