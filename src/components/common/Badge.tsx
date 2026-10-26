import React from "react";
import { LucideIcon } from "lucide-react";

interface BadgeProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "neutral" | "status" | "outline";
  className?: string;
}

export function Badge({
  children,
  icon: Icon,
  variant = "primary",
  className = ""
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-blue-50 text-blue-700 border-blue-200/80 font-mono",
    neutral: "bg-white text-slate-700 border-slate-200 shadow-xs font-mono",
    status: "bg-slate-900/85 backdrop-blur-md text-white border-white/10 font-mono",
    outline: "bg-transparent text-blue-700 border-blue-300 font-mono"
  };

  return (
    <span
      className={`inline-flex items-center space-x-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
