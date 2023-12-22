import { isFollowingUser } from '@/lib/follow-service';
import { getuserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';
import React from 'react'
import Actions from './_components/actions';

interface UserPageProps{
    params: {
        username: string;
    };
}

const UserPage = async({params}: UserPageProps) => {
    const user = await getuserByUsername(params.username);
    if(!user) return notFound();

    const isFollowing = await isFollowingUser(user.id);

  return (
    <div>
      User Page <p>
        {JSON.stringify(user)}

      </p>
      <p>
        {JSON.stringify(isFollowing)}
      </p>
      <Actions isFollowing={isFollowing}/>
    </div>
  )
}

export default UserPage
