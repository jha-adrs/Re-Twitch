"use client"

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCheck, Clipboard, Copy } from 'lucide-react';
import React from 'react'

interface CopyButtonProps {
    value: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = React.useState(false) as [boolean, React.Dispatch<React.SetStateAction<boolean>>];

    const onCopy = (value:string) => {
        if (!value) return;
        setIsCopied(true);

        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);

    }
    const Icon = isCopied ? CheckCheck : Clipboard;
    return (
        <Button variant={"ghost"} onClick={() => onCopy(value)} size={"sm"} disabled={isCopied || !value} className='disabled:opacity-100'>
            <Hint label={"Copy"} className='transition-all'>
                <CheckCheck className={cn(isCopied ? " w-6 h-6  text-emerald-500 " : "hidden text-white")} strokeWidth={2} />
                <Copy className={cn(isCopied ? " w-4 h-4 text-purple-500 hidden" : "w-4 h-4 text-primary")} />
            </Hint>
        </Button>
    )
}
