import { ModeToggle } from '@/components/ThemeSwitcher'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'

export default function Home(){
    return (<div>
      <ModeToggle />
      <p>
        You are here means you are authenticated
        <div >
        <UserButton
        afterSignOutUrl='/'/>
        </div>
      </p>
    </div>
    )

}