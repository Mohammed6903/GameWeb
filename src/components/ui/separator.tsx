"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

<<<<<<< HEAD
import { cn } from "@/lib/utils"
=======
import { cn } from "@/lib/utils/cn"
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
<<<<<<< HEAD
        className
=======
        className as string
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
