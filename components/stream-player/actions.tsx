"use client"
import React, { useTransition } from 'react';
import { Button } from '../ui/button';
import { useAuth } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { onFollow, onUnfollow } from '@/actions/follow';
import { toast } from 'sonner';
import { useCustomTheme } from '@/store/use-sidebar';
import { Skeleton } from '../ui/skeleton';

interface ActionsProps {
    isFollowing: boolean;
    isHost: boolean;
    hostIdentity: string;
}

export const Actions = ({
    isFollowing,
    isHost,
    hostIdentity
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const {
        userId
    } = useAuth();
    const { theme } = useCustomTheme((state => state));
    const router = useRouter();
    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity).then((data) => {
                toast.success(`You are now following ${data.following.username}`, { invert: theme === "dark" });
            }).catch((err) => {
                toast.error(
                    "Something went wrong while following, please try again later",
                    {
                        invert: theme === "dark"
                    }
                )
            })
        })
    }
    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity).then((data) => {
                toast.success(`You have unfollowed ${data.following.username}!`, { invert: theme === "dark" });
            }).catch((err) => {
                toast.error(
                    "Something went wrong while unfollowing, please try again later",
                    {
                        invert: theme === "dark"
                    }
                )
            })
        })
    }
    const toggleFollow = async () => {
        
        if (!userId) {
            return router.push('/sign-in');
        }
        if (isHost) {
            return toast.error("You can't follow/unfollow yourself!", { invert: theme === "dark" });
        }
        if (isFollowing) {

            handleUnFollow();

        } else {

            handleFollow();
        }


    }

    return (
        <Button onClick={toggleFollow} variant={"primary"} size={"sm"} className='w-full lg:w-auto' disabled={isPending}>
            <Heart className={cn(
                'h-4 w-4 mr-2',
                isFollowing ? "fill-white" : "fill-none"
            )} />
            {
                isFollowing ? "Unfollow" : "Follow"
            }
        </Button>
    )
}

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    );
};