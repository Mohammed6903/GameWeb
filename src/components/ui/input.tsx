import * as React from "react"

<<<<<<< HEAD
import { cn } from "@/lib/utils"
=======
import { cn } from "@/lib/utils/cn"
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
<<<<<<< HEAD
          className
=======
          className as string
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
