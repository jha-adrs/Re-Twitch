import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

export const Actions = () => {
    return (
        <div className="flex items-center justify-end gap-x-4 ml-4">
            <Button
                variant={"ghost"}
                size={"sm"}
                className="text-muted-foreground hover-text-primary transition"
                asChild
            >
                <Link className='' href={"/"}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Exit
                </Link>
                {/**Add confirmation modal */}
            </Button>
            <UserButton afterSignOutUrl='/' appearance={{
                elements: {
                    rootBox: "rounded-full"
                }
            }
            } />

        </div>
    )
}

