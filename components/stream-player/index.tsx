"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { useCustomTheme } from "@/store/use-sidebar";
import { Stream, User } from "@prisma/client"
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {  LiveKitRoom } from "@livekit/components-react"
import { Video } from "./video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";
import { ChatToggle } from "./chat-toggle";
interface StreamPlayerProps {
    user: User & { stream: Partial<Stream> | null };
    stream: Partial<Stream>;
    isFollowing: boolean;
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
    const {
        isPending,
        isFailed,
        token,
        name,
        identity,
        isComplete
    } = useViewerToken(user.id);
    const { theme } = useCustomTheme((state => state))
    const { collapsed } = useChatSidebar((state) => state);
    if (!token || !name || !identity) {
        return (
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <Loader2 size={24} className="animate-spin" />
                <p className='mt-2 text-md font-semibold text-gray-500'>Loading...</p>
            </div>
        )
    }
    return (
        <>
        {
            collapsed && (
                <div className='hidden lg:block fixed top-[100px] right-2 z-50'>
                    <ChatToggle/>
                </div>
            )
        }
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WEBSOCKET_URL}
                className={cn(
                    "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
                    collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
                )}
            >
                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video
                        hostname={user.username}
                        hostIdentity={user.id}
                    />
                </div>
                <div className={cn(
                    "col-span-1 ",
                    collapsed && "hidden"
                )}>
                    <Chat 
                        viewerName={name}
                        hostName={user.username}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}
                        isChatEnabled={stream?.isChatEnabled}
                        isChatDelayed={stream?.isChatDelayed}
                        isChatFollowersOnly={stream?.isChatFollowersOnly}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
}