"use client";
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCreatorSidebar } from '@/store/use-creator-sidebar';
import { Expand, Shrink } from 'lucide-react'
import React from 'react'
import { useIsClient } from 'usehooks-ts';

export const Toggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useCreatorSidebar((state) => state);
    const label = collapsed ? "Expand" : "Collapse";
    return (
        <>
            {
                collapsed && (
                    <div className=" items-center pt-3 w-full justify-center hidden lg:flex">
                        <Hint label={label} side='right' className='h-auto p-2'>
                            <Button variant={"ghost"} className='h-auto p-2'
                                onClick={onExpand}>
                                <Expand className='h-5 w-5' />
                            </Button>
                        </Hint>
                    </div>
                )
            }
            {
                !collapsed && (
                    <div className="hidden lg:flex pt-3 pl-6 mb-2  items-center w-full">
                        <p className="font-semibold text-primary">
                            Dashboard
                        </p>
                        <Hint label={label} side='right' className='h-auto  ml-auto' asChild>
                            <Button variant={"ghost"}
                                onClick={onCollapse}>
                                <Shrink className='h-4 w-4' />
                            </Button>
                        </Hint>
                    </div>
                )
            }
        </>
    )
}


export const ToggleSkeleton = () => {
    return (
        <div className="pt-3 pl-6 mb-2  items-center justify-between w-full hidden lg:flex">
            <Skeleton className="h-5 w-24" />
            <Button variant={"ghost"}>
                <Skeleton className="h-6 w-6 ml-auto" />
            </Button>
        </div>
    )
}