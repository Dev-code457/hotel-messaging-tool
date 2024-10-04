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
      className={`m-1 text-white font-medium rounded-full text-xs px-4 py-3 text-center  mb-2 ${classnames}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
