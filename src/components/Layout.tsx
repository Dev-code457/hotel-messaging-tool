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
      className={`bg-white w-[50%] h-[30vh] flex-col justify-end items-start rounded-3xl shadow-2xl my-12 border-2 space-x-6 border-black ${classnames}`}
    >
      <p className="text-lg font-bold text-white bg-black px-6 py-1 absolute -mt-[18px] right-[22%] rounded-lg">
        {heading}
      </p>
      {children}
    </div>
  );
}

export default Section;
