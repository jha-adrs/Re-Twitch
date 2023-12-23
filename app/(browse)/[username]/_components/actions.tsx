"use client"
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { onFollow, onUnfollow } from '@/actions/follow'
import { toast } from 'sonner';
import { useCustomTheme } from '@/store/use-sidebar';
import { onBlock, onUnblock } from '@/actions/block';

interface ActionsProps {
    isFollowing: boolean;
    isBlocked: boolean;
    userId: string;
}

const Actions = ({
    isFollowing,
    isBlocked,
    userId
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();
    const { theme } = useCustomTheme();
    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId).then((data) => {
                toast.success(
                    `You are now following ${data.following.username}`
                    , { invert: theme === "dark" })
            }).catch(() => {
                toast.error(
                    "Something went wrong"
                    , { invert: theme === "dark" })
            })

        })
    }

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId).then((data) => {
                toast.success(
                    `You have unfollowed ${data.following.username}`
                    , { invert: theme === "dark" })
            }).catch(() => {
                toast.error(
                    "Something went wrong"
                    , { invert: theme === "dark" })
            })

        })
    }
    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId).then((data) => {
                toast.warning(
                    `You have blocked ${data.blocked.username}`
                    , { invert: theme === "dark" })
            }).catch(() => {
                toast.error(
                    "Something went wrong"
                    , { invert: theme === "dark" })
            })

        })
    };
    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId).then((data) => {
                toast.warning(
                    `You have unblocked ${data.blocked.username}`
                    , { invert: theme === "dark" })
            }).catch(() => {
                toast.error(
                    "Something went wrong"
                    , { invert: theme === "dark" })
            })

        })
    };

    return (
        <>
            <Button
                variant={isFollowing ? "secondary" : "primary"}
                onClick={
                    () => {
                        isFollowing ? handleUnFollow() : handleFollow()
                    }
                }
                disabled={isPending}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>
            <Button
                variant={isBlocked ? "default" : "outline"}
                onClick={
                    () => {
                        isBlocked ? handleUnblock() : handleBlock() 
                    }
                }
                disabled={isPending}
            >
                {isBlocked ? "Unblock" : "Block"}
            </Button>
        </>
    )
}

export default Actions
