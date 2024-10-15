import React, { ReactNode } from "react";

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
      className={`relative bg-white flex flex-col justify-end items-start rounded-2xl shadow-2xl border-2 gap-3 border-black ${classnames}  h-[30vh]`}
    >
      <p className="text-lg font-bold text-white bg-black px-4 py-2 absolute top-0 right-[2%] transform translate-y-[-50%] rounded-lg">
        {heading}
      </p>
      <div className="w-full">
      {children}
      </div>
    </div>
  );
}

export default Section;
