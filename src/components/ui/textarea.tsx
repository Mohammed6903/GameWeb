import * as React from "react"

<<<<<<< HEAD
import { cn } from "@/lib/utils"
=======
import { cn } from "@/lib/utils/cn"
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
})
Textarea.displayName = "Textarea"

export { Textarea }
