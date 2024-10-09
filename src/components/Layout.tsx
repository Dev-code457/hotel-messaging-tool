import React, { ReactNode } from "react";
import Input from "./Input";

function Section({
  children,
  heading,
  classnames,
}: {
  children: ReactNode;
  heading: string;
  classnames: string;
}) {
  return (
    <div
      className={`bg-white w-[55%] h-[30vh] flex-col justify-end items-start rounded-2xl shadow-2xl my-8 border-2 space-x-6 border-black ${classnames}`}
    >
      <p className="text-2xl font-bold text-white bg-black px-8 py-3 absolute -mt-[22px] right-[15%] rounded-lg">
        {heading}
      </p>
      {children}
    </div>
  );
}

export default Section;
