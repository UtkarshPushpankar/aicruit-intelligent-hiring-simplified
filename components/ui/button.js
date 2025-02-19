"use client";

import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const variants = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  secondary: "bg-yellow-400 hover:bg-yellow-500 text-black",
  danger: "bg-red-500 hover:bg-red-600 text-white",
};

export const Button = ({ children, variant = "primary", className, ...props }) => (
  <button
    className={clsx(
      "px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ease-in-out",
      variants[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  className: PropTypes.string,
};

export default Button;