
import React from 'react'
import { Logo } from './logo'
import Search from './search'
import { ModeToggle } from '@/components/ThemeSwitcher'
import { Actions } from './actions'

export const Navbar = () => {
    return (
        <nav className='fixed top-0 w-full h-12 z-[49] bg-accent px-2 lg:px-4 flex justify-between items-center shadow-sm'>
            <Logo />
            <div className='inline-flex gap-x-2 w-full lg:w-[400px]'>
                <Search />
                <Actions />
                <ModeToggle />
            </div>
        </nav>
    )
}


