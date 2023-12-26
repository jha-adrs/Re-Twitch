"use client"
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { Expand, Shrink } from 'lucide-react';
import React from 'react';
import { Hint } from '../hint';
import { Button } from '../ui/button';

interface ChatToggleProps {

}

export const ChatToggle = ({ }: ChatToggleProps) => {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useChatSidebar((state) => state);
    const Icon = collapsed? Expand : Shrink;
    const label = collapsed? "Expand chat" : "Collapse chat";
    const onToggle = () => {
        if(collapsed){
            onExpand();
        } else{
            onCollapse();
        }
    }

    return (
        <Hint label={label} side='left'>
            <Button
                onClick={onToggle}
                variant={"ghost"}
                className='h-auto p-2 text-primary bg-accent hover:bg-foreground/10 '
            >
                <Icon className='h-4 w-4'/>
            </Button>
        </Hint>
    )
}