import React, { useMemo } from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  class?: string;
  content?: string;
  type?:
    | "primary"
    | "secondary"
    | "accent"
    | "error"
    | "warning"
    | "success"
    | "info"
    | "ghost"
    | "disabled"
    | "loading";
  size?: "lg" | "md" | "sm";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  type = "primary",
  size = "lg",
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${type} btn-${size} ${className} ${
        disabled && "btn-disabled"
      }`}
      {...props}
    ></button>
  );
};
