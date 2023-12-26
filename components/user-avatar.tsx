import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback } from './ui/avatar';
import Image from 'next/image';
import { AvatarImage } from '@radix-ui/react-avatar';
import { LiveBadge } from './live-badge';




export const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-10 w-10",
                lg: "h-14 w-14",
            }
        },
        defaultVariants: {
            size: "default",
        }
    }
);
interface UserAvatarProps
    extends VariantProps<typeof avatarSizes> {
    imageUrl: string;
    username: string;
    isLive?: boolean;
    showBadge?: boolean;
}
const UserAvatar = ({
    imageUrl,
    username,
    isLive,
    showBadge,
    size,
}: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;


    return (
        <div className='relative'>
            <Avatar className={cn(
                isLive && "ring-2 ring-rose-500 border-2 border-white",
                avatarSizes({ size })
            )}>
                <AvatarImage src={imageUrl} alt='user avatar'
                    className="object-cover" />

                <AvatarFallback>
                    {username[0]?.toUpperCase()}
                    {username[username.length - 1]?.toUpperCase()}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            )}
        </div>
    )
}

export default UserAvatar

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {
}

export const UserAvatarSkeleton = ({
    size,
}: UserAvatarSkeletonProps) => {
    return (
        <Skeleton className={cn(
            "rounded-full",
            avatarSizes({ size })
        )} />
    )
}
