import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface HintProps {
    label: string;
    children : React.ReactNode;
    asChild? : boolean;
    side? : "top" | "bottom" | "left" | "right";
    align? : "start" | "center" | "end";
    className? : string;
}

export const Hint = ({
    label,
    children,
    asChild = false,
    side = "top",
    align = "center",
    className = ""
}: HintProps) => {
  return (
    <TooltipProvider >
        <Tooltip delayDuration={0}>
            <TooltipTrigger className={className} asChild={asChild}>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side} align={align} className="text-primary">
                <p className='font-semibold'>
                {label}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}
