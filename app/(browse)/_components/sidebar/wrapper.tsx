"use client";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { Toggle } from "./toggle";
interface WrapperProps {
    children: React.ReactNode;
};

export const Wrapper = ({ children }: WrapperProps) => {
    const {collapsed} = useSidebar((state) => state);
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