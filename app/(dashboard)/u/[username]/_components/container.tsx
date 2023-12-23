"use client"
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { useSidebar } from '@/store/use-sidebar';
import React from 'react'
import { useEffect } from 'react';
import { useMediaQuery } from "usehooks-ts"
interface ContainerProps {
    children: React.ReactNode;
}
export const Container = ({ children }: ContainerProps) => {
    const { collapsed,onCollapse, onExpand } = useCreatorSidebar((state) => state);
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
            collapsed ? "ml-14" : "ml-14 lg:ml-64 "
        )}>
            {children}
        </div>
    )
}

