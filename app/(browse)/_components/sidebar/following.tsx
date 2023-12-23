"use client"
import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item";
import { Skeleton } from "@/components/ui/skeleton";

interface FollowingProps {
    data: (Follow & { following: User })[];
}

export const Following = ({ data }: FollowingProps) => {
    const { collapsed } = useSidebar((state) => state);
    if (!data.length) return null;


    return (
        <div>
            {!collapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Following
                    </p>
                </div>
            )}
            <ul className="px-2 space-y-2">
                {data.map((follow) => (
                    <UserItem key={follow.following.id} username={follow.following.username} imageUrl={follow.following.imageUrl}
                     />
                ))}
            </ul>
        </div>
    )
}


export const FollowingSkeleton = () => {
    return(
        <>
        <div className="pl-6 mb-4">
            <Skeleton className="hidden lg:block h-5 w-24" />
        </div>
        <ul className="space-y-2 px-2">
            {[...Array(3)].map((_,i) => (<UserItemSkeleton key={i}/>))}
        </ul>
        </>
    )
}
