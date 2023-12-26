"use client"
import React, { useMemo } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { Hint } from '../hint';
import { Info } from 'lucide-react';

interface ChatFormProps {
    onSubmit: (value: string) => void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowing: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export const ChatForm = ({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowing,
    isChatDelayed,
    isChatFollowersOnly
}: ChatFormProps) => {
    const [isDelayBlocked, setIsDelayBlocked] = React.useState(false);
    const isChatFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing;
    const isDisabled = isHidden || isDelayBlocked || isChatFollowersOnlyAndNotFollowing;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isDisabled || !value) return;

        if (isChatDelayed && !isDelayBlocked) {
            setIsDelayBlocked(true);
            setTimeout(() => {
                setIsDelayBlocked(false);
            }, 3000);
            return;
        } else {
            onSubmit();
        }

    };
    return (
        <form action="" onSubmit={handleSubmit} className="flex flex-col items-center gap-y-4 p-3">
            <div className="w-full">
                <ChatInfo
                    isChatDelayed={isChatDelayed}
                    isChatFollowersOnly={isChatFollowersOnly}
                />
                <Input
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    placeholder="Send a message"
                    disabled={isDisabled}
                    className={cn(
                        "border border-foreground/10 ",
                        isChatFollowersOnly && "rounded-t-none border-t-0"
                    )}
                />
            </div>
            <div className='ml-auto'>
                <Button variant={"primary"} size={"sm"}
                    type='submit'
                    disabled={isDisabled}
                >
                    Chat
                </Button>
            </div>
        </form>
    )
}

export const ChatFormSkeleton = () => {
    return (
        <div className="flex flex-col items-center gap-y-4 p-3">

            <Skeleton className="h-10 w-full " />

            <div className='flex items-center gap-x-2 ml-auto'>
                <Skeleton className="h-7 w-7 " />
                <Skeleton className="h-7 w-12 " />
            </div>
        </div>
    )
}

interface ChatInfoProps {
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export const ChatInfo = ({
    isChatDelayed,
    isChatFollowersOnly
}: ChatInfoProps) => {
    const hint = useMemo(() => {
        if (isChatFollowersOnly && !isChatDelayed) {
            return "Chat is followers only";
        }
        if (isChatDelayed && !isChatFollowersOnly) {
            return "Slow mode is enabled";
        }
        if (isChatDelayed && isChatFollowersOnly) {
            return "Chat is delayed and followers only";
        }
        if(!isChatDelayed && !isChatFollowersOnly) {
            return "Chat is enabled";
        }
    }, [isChatDelayed, isChatFollowersOnly]);

    const label = useMemo(() => {
        if (isChatFollowersOnly && !isChatDelayed) {
            return "Followers only";
        }
        if (isChatDelayed && !isChatFollowersOnly) {
            return "Slow mode enabled";
        }
        if (isChatDelayed && isChatFollowersOnly) {
            return "Followers only and slow mode";
        }
        if(!isChatDelayed && !isChatFollowersOnly) {
            return "Chat enabled";
        }
    }, [isChatDelayed, isChatFollowersOnly]);
   
    return (
        <div className="p-2 text-muted-foreground bg-foreground/5 border border-primary/10 w-full rounded-t-md flex items-center gap-x-2 ">
            <Hint label={hint}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    )
}