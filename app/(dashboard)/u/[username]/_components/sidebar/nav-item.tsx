"use client"
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { SidebarItemType } from '@/lib/constants/creator_dasboard'
import { cn } from '@/lib/utils';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface NavitemProps {
    item: SidebarItemType;
    collapsed: boolean;
    isActive?: boolean;
}

export const NavItem = ({ item, collapsed, isActive, ...props }: NavitemProps) => {

    return (
            <Hint label={item.label} side={"right"} align={"center"} asChild>
            <Button
                variant={"ghost"}
                className={cn(
                    "w-full h-10 hover:bg-accent-foreground/10 rounded-none",
                    collapsed ? "justify-center" : "justify-start",
                    isActive ? "bg-gray-200 " : "text-zinc-700 dark:text-zinc-300"
                )}
                asChild>
                <Link href={item.href} key={item.href}>
                    <item.icon className={cn(
                        "h-6 w-6",
                        collapsed ? "mr-0" : "mr-2"

                    )} />
                    {
                        !collapsed && <span><p className="text-sm font-medium">{item.label}</p></span>
                    }

                </Link>
            </Button>
            </Hint>
    )
}


export const NavItemSkeleton = () => {
    return(
        <li className="flex items-center gap-x-4 lg:px-3 py-2">
            <Skeleton className='min-h-8 min-w-8 rounded-full' />
            <div className="flex-1 hidden lg:flex ">
                <Skeleton className="h-6 w-24" />
            </div>
        </li>
    )
}