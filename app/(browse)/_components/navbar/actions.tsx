import React from 'react'
import PropTypes from 'prop-types'
import { SignInButton, currentUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Actions = async() => {
    const user  = await currentUser() as any;
  return (
    <div className="flex items-center justify-end gap-x-2 ml-4">
      {
        !user && (
            <SignInButton>
                <Button>
                    Login
                </Button>
            </SignInButton>
        )
      }
      {
        !!user && (
            <div className="flex items-center gap-x-4">
                <Button size={"sm"} variant={"ghost"} className='text-muted-foreground hover:text-primary'>
                    <Link href={`/u/${user.username}`}>

                    </Link>
                </Button>
            </div>
        )
      }
    </div>
  )
}

Actions.propTypes = {

}

