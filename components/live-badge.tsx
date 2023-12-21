import { cn } from "@/lib/utils";

interface LiveBadgeProps {
    className?: string;
}

export const LiveBadge = ({ className }: LiveBadgeProps) => {
    
    return (
        <div className={cn(
            " bg-red-500 text-center p-0.5 px-1.5 rounded-md text-[10px] border border-background font-semibold text-white",
            className
        )}>
            LIVE
        </div>
    )
}