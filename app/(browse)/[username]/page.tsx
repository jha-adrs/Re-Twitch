import { isFollowingUser } from '@/lib/follow-service';
import { getuserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import React from 'react'
import Actions from './_components/actions';
import { isBlockedByUser } from '@/lib/block-service';

interface UserPageProps{
    params: {
        username: string;
    };
}

const UserPage = async({params}: UserPageProps) => {
    const user = await getuserByUsername(params.username);
    if(!user) return notFound();

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked =  await isBlockedByUser(user.id);
    if(isBlocked){} //return notFound();
    // Whenver A blocks B, 
    /**
     * A can see B's profile, join streams etc.
     * But, B cannot see A's profile, join streams etc.
     */
  return (
    <div>
      User Page <p>
        {JSON.stringify(user)}

      </p>
      <p>
        {JSON.stringify(isFollowing)}
      </p>
      <p>
        {JSON.stringify(isBlocked)}
      </p>
      <Actions userId={user.id} isFollowing={isFollowing} isBlocked={isBlocked} />
    </div>
  )
}

export default UserPage
