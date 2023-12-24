import { Input } from '@/components/ui/input';
import React from 'react'
import { CopyButton } from './copy-button';

interface UrlCardProps {
    value: string | null;
}

export const UrlCard = ({ value }: UrlCardProps) => {
    return (
        <div className='rounded-xl bg-accent p-4'>
            <div className="flex items-center justify-between">

                <p className="font-semibold shrink-0 mr-4">
                    Server URL
                </p>
                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input 
                            value={value || ""}
                            readOnly
                            placeholder='Server URL'
                        />
                        <CopyButton value={value || ""} />
                        </div>
                </div>
            </div>
        </div>
    )
}

