import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

export default function Home(){
    return (
      <p>
        You are here means you are authenticated
        <div >
        <UserButton afterSignOutUrl='/'/>
        </div>
      </p>
    )

}