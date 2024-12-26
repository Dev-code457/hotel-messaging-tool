import React, { ReactNode } from "react";

function Button({
  text,
  classnames,
  type,
  onClick,
  disabled
}: {
  text: ReactNode | string;
  classnames: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean
}) {
  return (
    <button
      type={type}
      className={` text-white font-semibold text-xs rounded-full  px-5 py-3 text-center ${classnames}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;