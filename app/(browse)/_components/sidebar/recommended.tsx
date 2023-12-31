"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Stream, User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item";
import { Skeleton } from "@/components/ui/skeleton";

interface RecommendedProps {
    data: (
        User & { stream: { isLive: boolean | null  }}
    )[];
}

export const Recommended = ({ data }: RecommendedProps) => {
    const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
    const showLabel = !collapsed && data.length > 0;
    return (
        <div>
            {
                showLabel && (
                    <div className="pl-6 mb-4">
                        <p className="text-sm text-muted-foreground">
                            Recommended
                        </p>
                    </div>
                )
            }
            <ul className="space-y-2 px-2">
                {data.map((user) => (
                    <UserItem 
                    key={user.id} 
                    username={user.username}  
                    imageUrl={user.imageUrl}
                    isLive={user.stream?.isLive}
                    />
                ))}
            </ul>
        </div>
    )
}

export const RecommendedSkeleton = () => {
    return(
        <>
        <div className="pl-6 mb-4 mt-4">
            <Skeleton className="hidden lg:block h-5 w-24" />
        </div>
        <ul className="space-y-2 px-2">
            {[...Array(3)].map((_,i) => (<UserItemSkeleton key={i}/>))}
        </ul>
        </>
    )
}
