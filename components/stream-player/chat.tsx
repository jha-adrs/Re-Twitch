"use client"

import { Chatvariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./chat-form";
import { ChatList } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
    hostname: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export const Chat = ({
    hostname,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
}: ChatProps) => {

    const matches = useMediaQuery("(max-width: 1024px)");
    const {
        collapsed,
        variant,
        onExpand
    } = useChatSidebar((state) => state);
    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline = participant && connectionState === ConnectionState.Connected;

    const isHidden = !isChatEnabled || !isOnline;
    //console.log("Chattsx", isHidden, isChatEnabled, isOnline, connectionState, participant,"host", hostIdentity   )
    const [value, setValue] = useState("");
    const {
        chatMessages: messages,
        send
    } = useChat();

    useEffect(()=>{
        if(matches) {
            onExpand();
        }
    },[matches, onExpand]);

    const reversedMessages = useMemo(()=>{
        return [...messages].sort((a,b) => b.timestamp - a.timestamp);
    },[messages]);
    const onSubmit= () => {
        if(!send) return;
        send(value);
        setValue("");
    }
    const onChange = (value:string)=>{
        setValue(value);
    }

    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader/>
            {
                variant === Chatvariant.CHAT && (
                    <>
                        <ChatList
                            messages={reversedMessages}
                            isHidden={isHidden}
                        />
                        <ChatForm 
                            onSubmit={onSubmit}
                            onChange={onChange}
                            value={value}
                            isHidden={isHidden}
                            isFollowing={isFollowing}
                            isChatDelayed={isChatDelayed}
                            isChatFollowersOnly={isChatFollowersOnly}
                        />
                    </>
                )
            }
            {
                variant === Chatvariant.COMMUNITY && (
                    <ChatCommunity
                        viewerName={viewerName}
                        hostName={hostname}
                        isHidden={isHidden}
                    />
                )
            }
        </div>
    )
}