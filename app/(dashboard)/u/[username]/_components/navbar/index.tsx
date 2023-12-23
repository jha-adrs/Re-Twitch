
import React from 'react'
import { Logo } from './logo'
import { ModeToggle } from '@/components/ThemeSwitcher'
import { Actions } from './actions'

export const Navbar = () => {
    return (
        <nav className='fixed top-0 w-full h-14 z-[49] bg-accent px-2 lg:px-4 flex justify-between items-center shadow-sm'>
            <Logo />
            <div className='inline-flex gap-x-2  justify-end'>
                {/*Add search here later */}
                <Actions />
                <ModeToggle className=" outline-none border-0 aspect-square" />
            </div>
        </nav>
    )
}


