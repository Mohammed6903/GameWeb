"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

<<<<<<< HEAD
import { cn } from "@/lib/utils"
=======
import { cn } from "@/lib/utils/cn"
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
<<<<<<< HEAD
    className={cn(labelVariants(), className)}
=======
    className={cn(labelVariants(), className as string)}
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
