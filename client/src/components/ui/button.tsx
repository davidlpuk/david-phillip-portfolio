import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-transform",
        primary: "bg-primary text-black font-extrabold hover:scale-105 transition-transform",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border-2 border-black dark:border-white bg-transparent text-black dark:text-white font-extrabold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-105",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent dark:hover:bg-accent/80",
        link: "text-primary underline-offset-4 hover:underline",
        lavender: "bg-lavender text-black font-extrabold hover:scale-105 transition-transform",
      },
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3", // 44px minimum touch target
        sm: "h-11 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5", // 44px minimum
        lg: "h-12 rounded-sm px-6 has-[>svg]:px-4", // 48px for comfort
        xl: "h-14 px-8 py-4 rounded-full font-extrabold", // Already 56px
        icon: "size-11", // 44px minimum touch target
        "icon-sm": "size-11", // 44px minimum
        "icon-lg": "size-12", // 48px for comfort
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
