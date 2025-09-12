import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "secondary"; // ✅ ajoute secondary
  size?: "sm" | "md" | "lg";
}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-cyan-700 text-white hover:bg-cyan-800",
      outline:
        "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-700",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",

    };
    

    const sizes = {
      sm: "h-8 px-3 text-sm rounded-md",
      md: "h-10 px-4 text-sm rounded-lg",
      lg: "h-12 px-6 text-base rounded-xl",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
