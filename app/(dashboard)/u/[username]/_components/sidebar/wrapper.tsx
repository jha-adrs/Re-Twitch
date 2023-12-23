"use client"
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import React from 'react'

interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper = ({children}:WrapperProps) => {
    const {collapsed} = useCreatorSidebar((state)=>state);
  return (
    <aside
            className={cn(
                "fixed left-0 flex flex-col w-12 lg:w-60 bg-accent dark:bg-neutral-900 h-full border-r border-muted-background",
                collapsed && "lg:w-12"
            )}>
            {children}
        </aside>
  )
}

export default Wrapper
