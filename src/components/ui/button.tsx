import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[10px] whitespace-nowrap text-base font-medium font-avenir-regular ring-offset-background transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#2C3746] text-white hover:bg-[#DC842E]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "bg-[#2C3746] text-white hover:bg-[#DC842E]",
        secondary: "bg-[#2C3746] text-white hover:bg-[#DC842E]",
        ghost: "bg-[#2C3746] text-white hover:bg-[#DC842E]",
        link: "text-white underline-offset-4 hover:underline",
        accent: "bg-[#DC842E] text-white hover:bg-[#DC842E]/90",
        // Admin panel theme variants
        "admin-primary": "bg-black text-white hover:bg-[#212121]",
        "admin-secondary":
          "bg-white text-black border border-[#e0e0e0] hover:bg-[#f5f5f5]",
        "admin-outline":
          "bg-white text-black border border-[#e0e0e0] hover:bg-[#f5f5f5]",
        "admin-ghost": "bg-transparent text-black hover:bg-[#f5f5f5]",
        "admin-accent": "bg-[#424242] text-white hover:bg-[#212121]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2",
        lg: "h-14 px-8 py-4",
        icon: "h-12 w-12 p-0",
      },
      bordered: {
        true: "border-[5px]",
        false: "border-none",
      },
      rounded: {
        default: "rounded-[10px]",
        sm: "rounded-[8px]",
        lg: "rounded-[12px]",
        none: "rounded-none",
      },
      withWrapper: {
        true: "",
        false: "",
      },
      wrapperWidth: {
        default: "w-auto",
        full: "w-full",
        fixed: "max-w-[250px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      bordered: true,
      rounded: "default",
      withWrapper: true,
      wrapperWidth: "fixed",
    },
    compoundVariants: [
      {
        variant: "default",
        bordered: true,
        className: "border-[#273548] hover:border-[#DC842E]",
      },
      {
        variant: "accent",
        bordered: true,
        className: "border-[#DC842E]",
      },
    ],
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      bordered,
      rounded,
      withWrapper = true,
      wrapperWidth,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // For buttons with wrapper, we need to adjust the button styling
    const buttonStyles = {
      variant: variant || "default",
      size,
      bordered: withWrapper ? false : bordered, // No border on inner button when using wrapper
      rounded: withWrapper ? ("none" as const) : rounded, // No rounded corners on inner button when using wrapper
      withWrapper,
      wrapperWidth,
      className: withWrapper ? cn("w-full bg-[#2C3746]", className) : className, // Ensure gray background for all admin buttons
    };

    const buttonElement = (
      <Comp className={cn(buttonVariants(buttonStyles))} ref={ref} {...props} />
    );

    if (withWrapper) {
      // Check if this is an admin button variant
      const isAdminVariant = variant?.toString().startsWith("admin-");

      return (
        <span
          className={cn(
            isAdminVariant
              ? "inline-block p-[2px] bg-white transition-all duration-300 border border-black rounded-md"
              : "inline-block p-[4px] bg-white transition-all duration-300 border-[3px] border-moonstone rounded-[5px]",
            wrapperWidth === "full" ? "w-full" : "w-auto"
          )}
        >
          {buttonElement}
        </span>
      );
    }

    return buttonElement;
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
