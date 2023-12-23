import React from 'react'
import PropTypes from 'prop-types'
import { SignInButton, UserButton, currentUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clapperboard, UserIcon } from 'lucide-react';

export const Actions = async () => {
    const user = await currentUser() as any;
    return (
        <div className="flex items-center justify-end gap-x-2 ml-4">
            {
                !user && (
                    <SignInButton>
                        <Button variant={"primary"} size={"sm"}>
                            Login
                        </Button>
                    </SignInButton>
                )
            }
            {
                !!user && (
                    <div className="flex items-center gap-x-2">
                        <Button size={"sm"} variant={"ghost"} className='text-muted-foreground hover:text-primary'>
                            <Link href={`/u/${user.username}`} className='inline-flex items-center gap-x-2'>
                                <Clapperboard className="w-6 h-6" />
                                <span className="hidden lg:block">Dashboard</span>
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl='/' appearance={{
                            elements:{
                                rootBox: "rounded-full"
                            }
                        }
                        }/>
                    </div>
                )
            }
        </div>
    )
}

Actions.propTypes = {

}

