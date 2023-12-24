import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted-foreground ", className)}
      {...props}
    />

      // <div className={cn(" skeleton bg-muted-foreground/50 rounded-md",className)} {...props}/>
    

  )
}

export { Skeleton }
