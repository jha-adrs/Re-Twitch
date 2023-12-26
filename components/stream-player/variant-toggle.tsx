"use client"
import { Chatvariant, useChatSidebar } from '@/store/use-chat-sidebar';
import { Expand, MessageSquareText, Shrink, Users2 } from 'lucide-react';
import React from 'react';
import { Hint } from '../hint';
import { Button } from '../ui/button';

interface VariantToggleProps {

}

export const VariantToggle = ({ }: VariantToggleProps) => {
    const {
        variant,
        onChangeVariant
    } = useChatSidebar((state) => state);
    const isChat = variant === Chatvariant.CHAT;
    const Icon = isChat? Users2 : MessageSquareText;
    const label = isChat? "Community" : "Normal Chat";
    const onToggle = () => {
        const newVariant = isChat? Chatvariant.COMMUNITY : Chatvariant.CHAT;
        onChangeVariant(newVariant);
    }

    return (
        <Hint label={label} side='left'>
            <Button
                onClick={onToggle}
                variant={"ghost"}
                className='h-auto p-2 hover:bg-foreground/10 hover:text-primary'
            >
                <Icon className='h-4 w-4'/>
            </Button>
        </Hint>
    )
}