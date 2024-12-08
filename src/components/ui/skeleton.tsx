<<<<<<< HEAD
import { cn } from "@/lib/utils"
=======
import { cn } from "@/lib/utils/cn"
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
<<<<<<< HEAD
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
=======
      className={cn("animate-pulse rounded-md bg-primary/10", className as string)}
>>>>>>> 9e77cfbce397bad25cb33d0228761e4dcd867137
      {...props}
    />
  )
}

export { Skeleton }
