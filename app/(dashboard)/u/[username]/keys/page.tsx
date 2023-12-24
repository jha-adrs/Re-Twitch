import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import { getStreamSettings } from '@/lib/constants/creator_dashboard';
import { Button } from '@/components/ui/button';
import { UrlCard } from './_components/url-card';
import { KeyCard } from './_components/key-card';
import { ConnectModal } from './_components/connect-modal';
import { Skeleton } from '@/components/ui/skeleton';

const KeyPage = async ({ params }: { params: { username: string } }) => {

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
                        Keys & URLs
                    </h1>
                    <ConnectModal />
                </div>
                <div className="space-y-4">
                    <UrlCard value={stream.serverUrl} />
                    <KeyCard value={stream.streamkey} />
                </div>
            </div >
    )
}

export default KeyPage
