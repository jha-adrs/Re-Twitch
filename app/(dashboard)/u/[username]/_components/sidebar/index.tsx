import { Toggle, ToggleSkeleton } from "./toggle"
import Wrapper from "./wrapper"

import { Navigation, NavigationSkeleton } from "./navigation"
export const Sidebar = () => {
    return (
        <>
            <Wrapper>
                    
                <Toggle />
                <Navigation />
            </Wrapper>
        </>
    )
}

export const SidebarSkeleton = () => {
    return (
      <aside className='fixed left-0 flex flex-col w-12 lg:w-60 bg-accent dark:bg-neutral-900 h-full border-r border-muted-background z-50'>
        <ToggleSkeleton />
        <NavigationSkeleton />
      </aside>
    )
  }