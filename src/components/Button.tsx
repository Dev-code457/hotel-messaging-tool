import React from "react";

function Button({
  text,
  classnames,
  type,
  onClick,
}: {
  text: string;
  classnames: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type={type}
      className={` text-white font-medium text-xs rounded-full  px-5 py-3 text-center ${classnames}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
