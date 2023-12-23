import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service';
import { notFound } from 'next/navigation';
import React from 'react'

const ChatPage = async ({ params }: { params: { username: string } }) => {


    const self = await getSelf();
    if (!self || self.username !== params?.username) {
        return notFound();
    }
    const stream = await getStreamByUserId(self.id);


    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Chat Settings
                </h1>
                <p>
                    
                    {JSON.stringify(stream)}
                </p>
                <p>
                    {JSON.stringify(self)}
                </p>
            </div>
        </div>
    )
}

export default ChatPage
