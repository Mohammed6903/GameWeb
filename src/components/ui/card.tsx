import * as React from "react"

<<<<<<< HEAD
import { cn } from "@/lib/utils"
=======
import { cn } from "@/lib/utils/cn"
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
<<<<<<< HEAD
      className
=======
      className as string
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
<<<<<<< HEAD
    className={cn("flex flex-col space-y-1.5 p-6", className)}
=======
    className={cn("flex flex-col space-y-1.5 p-6", className as string)}
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
<<<<<<< HEAD
    className={cn("font-semibold leading-none tracking-tight", className)}
=======
    className={cn("font-semibold leading-none tracking-tight", className as string)}
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
<<<<<<< HEAD
    className={cn("text-sm text-muted-foreground", className)}
=======
    className={cn("text-sm text-muted-foreground", className as string)}
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
<<<<<<< HEAD
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
=======
  <div ref={ref} className={cn("p-6 pt-0", className as string)} {...props} />
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
<<<<<<< HEAD
    className={cn("flex items-center p-6 pt-0", className)}
=======
    className={cn("flex items-center p-6 pt-0", className as string)}
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
