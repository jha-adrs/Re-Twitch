import React from 'react'
import { Wrapper } from './wrapper'
import { Toggle, ToggleSkeleton } from './toggle'
import { Recommended, RecommendedSkeleton } from './recommended'
import { getRecommended } from '@/lib/recommended-service'
import { getFollowedUsers } from '@/lib/follow-service'
import { Following, FollowingSkeleton } from './following'

const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={following} />
        <Recommended data={recommended} />
      </div>

    </Wrapper>
  )
}

export default Sidebar

export const SidebarSkeleton = () => {
  return (
    <aside className='fixed lg:pt-4 lg:space-y-4 left-0 flex flex-col w-14 lg:w-60 h-full bg-background border-r border-accent z-50'>
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />

    </aside>
  )
}