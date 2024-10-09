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
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type={type}
      className={` text-white font-medium rounded-full text-sm px-8 py-3 text-center ${classnames}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
