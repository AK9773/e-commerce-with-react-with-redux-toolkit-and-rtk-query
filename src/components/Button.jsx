import React from "react";

const Button = ({
  children,
  type = "button",
  textColor = "text-white",
  bgColor = "from-blue-500 via-blue-600 to-blue-700",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-2.5 text-center ${textColor} bg-gradient-to-r ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
