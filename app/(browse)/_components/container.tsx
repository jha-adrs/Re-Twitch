"use client"
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';
import React from 'react'
import { useEffect } from 'react';
import { useMediaQuery } from "usehooks-ts"
interface ContainerProps {
    children: React.ReactNode;
}
export const Container = ({ children }: ContainerProps) => {
    const { collapsed,onCollapse, onExpand } = useSidebar((state) => state);
    const matches:boolean = useMediaQuery("(max-width: 1024px)");
    // Re-render the component when the media query changes
    useEffect(() => {
        if(matches){
            onCollapse();
        } else{
            onExpand();
        }
    }, [matches, onCollapse, onExpand]);

    return (
        <div className={cn(
            "flex-1",
            collapsed ? "ml-12" : "ml-12 lg:ml-64 "
        )}>
            {children}
        </div>
    )
}

