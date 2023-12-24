"use client"
import { updateStream } from '@/actions/stream';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { useCustomTheme } from '@/store/use-sidebar';
import React, { useTransition } from 'react'
import { toast } from 'sonner';
type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly" 

interface ToggleCardProps {
    label : string;
    value : boolean;
    field: FieldTypes;
    description?: string;
}


export const ToggleCard = ({
    label,
    value,
    field,
    description
}:ToggleCardProps) => {
    const {theme} = useCustomTheme((state)=>state)
    const [isPending, startTransition] = useTransition();
    const onChange =  (value: boolean) => {
        startTransition(() => {
            updateStream({ [field]: value }).then((data) => {
                toast.info(
                    `Chat settings updated successfully`
                    , { invert: theme === "dark" })
            }).catch((err) => {
                toast.error(
                    `Failed to update ${label} to ${value}`
                    , { invert: theme === "dark" })
            })
        });

    }
  return (
    <div className='rounded-xl bg-accent p-4'>
      <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
            <p className="font-semibold shrink-0">
                {label}
            </p>
            <p className="font-light text-xs text-muted-foreground">
                {description}
            </p>
            </div>
            <div className="space-y-2">
                <Switch checked={value} className='data-[state=checked]:bg-violet-700 data-[state=unchecked]:bg-white'
                thumbClassNames='data-[state=unchecked]:bg-violet-700 data-[state=checked]:bg-white'
                disabled={isPending}    
                onCheckedChange={onChange}
                >
                    {value ? "On" : "Off"}
                </Switch>
            </div>
      </div>
    </div>
  )
}


export const ToggleCardSkeleton = () => {
    return (
        <div className='rounded-xl bg-accent p-4'>
      <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-1">
            <Skeleton className="w-20 h-6" />
            <Skeleton className="w-36 h-4" />
            </div>
            <div className="space-y-2">
                <Skeleton className="w-12 h-8" />
            </div>
      </div>
    </div>
    )
}