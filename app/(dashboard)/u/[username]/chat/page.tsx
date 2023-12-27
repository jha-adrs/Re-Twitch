import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import { ToggleCard, ToggleCardSkeleton } from './_components/toggle-card';
import { getStreamSettings } from '@/lib/constants/creator_dashboard';

const ChatPage = async ({ params }: { params: { username: string } }) => {

    //await new Promise((resolve) => setTimeout(resolve, 5000));
    const self = await getSelf();
    if (!self || self.username !== params?.username) {
        return notFound();
    }
    const stream = await getStreamByUserId(self.id);
    if (!stream || stream.userId !== self.id) {
        return notFound();
    }
    const streamItems = getStreamSettings(stream);

    return (
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold inline-blocl">
                        Chat Settings
                    </h1>
                </div>
                <div className="space-y-4">
                    {streamItems.map((item, index) => {
                        return (
                            <ToggleCard
                                key={index}
                                label={item.label}
                                value={item.value}
                                field={item.field}
                                description={item.description} />
                        )
                    })}

                </div>
            </div >
    )
}

export default ChatPage