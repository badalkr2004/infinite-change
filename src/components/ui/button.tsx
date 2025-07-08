import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-[10px] text-sm font-medium font-avenir-regular ring-offset-background transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-[5px] bg-[#2C3746] text-white border-[#273548] hover:bg-[#DC842E] hover:border-[#DC842E]",
  {
    variants: {
      variant: {
        default:
          "bg-[#2C3746] text-white border-[#273548] hover:bg-[#DC842E] hover:border-[#DC842E]",
        destructive:
          "bg-[#2C3746] text-white border-[#273548] hover:bg-[#DC842E] hover:border-[#DC842E]",
        outline:
          "border-[#273548] bg-[#2C3746] text-white hover:bg-[#DC842E] hover:border-[#DC842E] hover:text-white",
        secondary:
          "bg-[#2C3746] text-white border-[#273548] hover:bg-[#DC842E] hover:border-[#DC842E]",
        ghost:
          "hover:bg-[#DC842E] hover:text-white border-transparent hover:border-[#DC842E]",
        link: "text-white underline-offset-4 hover:underline border-transparent",
        accent:
          "bg-[#DC842E] text-white hover:bg-[#DC842E] border-[#DC842E] hover:border-[#DC842E]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-[8px] px-4 py-2",
        lg: "h-14 rounded-[12px] px-8 py-4",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <span
        className="inline-block p-[5px] bg-white rounded-[0px] transition-all duration-300 border-[5px] border-[#273548] w-full max-w-[250px] sm:max-w-none"
        style={{ borderRadius: "5px" }}
      >
        <Comp
          className={cn(
            "inline-flex items-center justify-center gap-[5px] whitespace-nowrap rounded-none text-base font-medium font-avenir-regular ring-offset-background transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#2C3746] text-white border-none px-4 py-2 sm:px-6 sm:py-3 hover:bg-[#DC842E] w-full",
            className
          )}
          ref={ref}
          {...props}
        />
      </span>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
