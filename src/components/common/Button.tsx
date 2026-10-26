import React from "react";
import { LucideIcon } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs space-x-1.5",
    md: "px-4 py-2.5 text-xs sm:text-[13px] space-x-2 shadow-xs",
    lg: "px-6 py-3 text-sm sm:text-base space-x-2.5 shadow-sm"
  };

  const variantStyles = {
    primary: "bg-blue-700 hover:bg-blue-800 text-white shadow-sm hover:shadow-md",
    secondary: "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300",
    outline: "bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-slate-400",
    dark: "bg-slate-900 hover:bg-slate-800 text-white border border-slate-800"
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === "right" && <Icon className="h-4 w-4 shrink-0" />}
    </button>
  );
}

export default Button;
