"use client";
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSidebar } from '@/store/use-sidebar';
import { Expand, Shrink } from 'lucide-react'
import React from 'react'

export const Toggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useSidebar((state) => state);
    const label = collapsed ? "Expand" : "Collapse";
    return (
        <>
            {
                collapsed && (
                    <div className=" items-center pt-2 w-full justify-center hidden lg:flex">
                        <Hint label={label} side='right' className='h-auto p-2'>
                        <Button variant={"ghost"} className='h-auto p-2'
                            onClick={onExpand}>
                            <Expand className='h-4 w-4' />
                        </Button>
                        </Hint>
                    </div>
                )
            }
            {
                !collapsed && (
                    <div className="p-3 pl-6 mb-2 flex items-center w-full">
                        <p className="font-semibold text-primary">
                            For you
                        </p>
                        <Hint label={label} side='right' className='h-auto p-2 ml-auto'>
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
        <div className="p-3 pl-6 mb-2 items-center justify-between w-full hidden lg:flex">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-6 ml-auto" />
        </div>
    )
}