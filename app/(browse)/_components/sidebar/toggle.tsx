"use client";
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/store/use-sidebar';
import { AlignLeft, ArrowRightFromLine, Expand, Shrink } from 'lucide-react'
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
                            <Expand className='h-5 w-5' />
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


