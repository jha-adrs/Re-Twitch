"use client";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserAvatar from "@/components/user-avatar";
import { ArrowRight } from "lucide-react";
import { LiveBadge } from "@/components/live-badge";
import { Skeleton } from "@/components/ui/skeleton";

interface UserItemProps {
    username: string;
    imageUrl: string;
    isLive?: boolean;
}
export const UserItem = ({
    username,
    imageUrl,
    isLive,

}: UserItemProps) => {

    const pathname = usePathname();
    const { collapsed }: { collapsed: boolean } = useSidebar((state) => state);
    const href = `/${username}`;
    const isActive: boolean = pathname === href;
    return (
        <Button asChild variant={"ghost"}
            className={cn(
                "w-full h-12 hover:bg-white hover:dark:bg-accent",
                collapsed ? "justify-center" : "justify-start",
                isActive && "bg-primary-foreground"
            )}
        >
            <Link href={href}>
                <div
                    className={cn(
                        "flex items-center w-full gap-x-4",
                        collapsed && "justify-center"
                    )}>
                    <UserAvatar imageUrl={imageUrl}
                        username={username}
                        isLive={isLive}

                    />

                    <div className={cn(
                        "flex flex-col",
                        collapsed && "hidden"
                    )}>
                        <p className="text-sm font-medium text-primary">
                            {username}
                        </p>

                    </div>
                    
                </div>
                {isLive && !collapsed && (<LiveBadge />)
                
                }
                {!collapsed && !isLive && (
                    <ArrowRight className={cn(
                        " w-4 h-4 text-primary",
                        collapsed && "hidden"
                    )} />
                )}
                
            </Link>
        </Button>
    )
}

export const UserItemSkeleton = () => {
    return(
        <li className="flex items-center  gap-x-2 lg:px-3 py-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 hidden lg:block">
                <Skeleton className="h-6"/>
            </div>
        </li>
    )
}