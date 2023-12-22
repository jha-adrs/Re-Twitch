"use client"
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { onFollow } from '@/actions/follow'
import { toast } from 'sonner';

interface ActionsProps {
    isFollowing: boolean;
}

const Actions = ({
    isFollowing
}: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    return (
        <Button
            variant={"primary"}
            onClick={
                () => {
                    startTransition(() => {
                        onFollow("asda")
                        toast("Followed")
                    })
                }
            }
            disabled={isFollowing || isPending}
        >
            Follow
        </Button>
    )
}

export default Actions
