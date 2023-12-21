"use client";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { Toggle, ToggleSkeleton } from "./toggle";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RecommendedSkeleton } from "./recommended";
interface WrapperProps {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
    const {collapsed} = useSidebar((state) => state);
    const [isClient, setIsClient]: [boolean,Dispatch<SetStateAction<boolean>>] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    if (!isClient) {
        return (
            <aside className="fixed left-0 flex flex-col lg:w-60 bg-accent dark:bg-neutral-900 h-full border-r border-muted-background">
                <ToggleSkeleton />
                <RecommendedSkeleton />
            </aside>
        );
    }
    return (
        <aside
            className={cn(
                "fixed left-0 flex flex-col w-60 bg-accent dark:bg-neutral-900 h-full border-r border-muted-background",
                collapsed && "w-12"
            )}>
            {children}
        </aside>
    )
}