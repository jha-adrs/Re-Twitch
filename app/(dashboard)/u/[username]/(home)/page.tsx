import { StreamPlayer } from '@/components/stream-player/index'
import { getuserByUsername } from '@/lib/user-service'
import { currentUser } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
  params: {
    username: string
  }
}

const CreatorPage = async({params}:Props) => {
  const externalUser = await currentUser();
  const user = await getuserByUsername(params.username);

  if(!user || user.externalUserId !== externalUser?.id || !user.stream) {
    return notFound();
  }

  return (
    <div className='h-full '>
      <StreamPlayer
      user={user}
      stream={user.stream}
      isFollowing={true} //This is only for creator page
      />
    </div>
  )
}

export default CreatorPage
