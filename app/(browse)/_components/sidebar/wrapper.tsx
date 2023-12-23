"use client";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { Toggle, ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "./following";
interface WrapperProps {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
    const {collapsed} = useSidebar((state) => state);
    const isClient = useIsClient();
    
    if (!isClient) {
        return (
            <aside className="fixed left-0 lg:pt-4 lg:space-y-4 flex flex-col w-14 lg:w-60 bg-accent dark:bg-neutral-900 h-full border-r border-muted-background">
                
                <ToggleSkeleton />
                <FollowingSkeleton/>
                <RecommendedSkeleton />
            </aside>
        );
    }
    return (
        <aside
            className={cn(
                "fixed left-0 flex flex-col w-12 lg:w-60 bg-accent dark:bg-neutral-900 h-full border-r border-muted-background",
                collapsed && "w-12 lg:w-12"
            )}>
            {children}
        </aside>
    )
}