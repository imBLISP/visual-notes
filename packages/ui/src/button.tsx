"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip"

import { cn } from "@repo/utils"

const buttonVariants = cva(
  "inline-flex  whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // ghost: "hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-[#f7f7f5] hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

const TooltipButton = React.forwardRef<HTMLButtonElement, ButtonProps & { tooltip: string, tooltipInfo?: string, side?: "top" | "bottom" | "left" | "right", sideOffset?: number}>(
  ({ className, variant, size, asChild = false, tooltip = "", tooltipInfo = "", side="top", sideOffset=4, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
          </TooltipTrigger>
          <TooltipContent side={side} sideOffset={sideOffset} className="z-[60] bg-foreground flex flex-row gap-1">
            <div className="text-zinc-200 text-xs font-medium">
              {tooltip}
            </div>
            <div className="text-zinc-400 text-xs font-normal">
              {tooltipInfo}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants, TooltipButton }
