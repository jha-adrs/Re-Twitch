// Contains all the constants for the creator dashboard

import { Fullscreen, KeyRound, LucideIcon, MessageSquareText, Users2 } from "lucide-react";
import { UserResource } from "@clerk/types"
import { Stream, User } from "@prisma/client";
// Sidebar Items
export interface SidebarItemType {
    label: string;
    href: string;
    icon: LucideIcon;
    hintlabel?: string;

}

type UserProp = UserResource | null | undefined;

export type SidebarItemsType = SidebarItemType[];


export const getSiderbarItems = (user: UserProp): SidebarItemType[] => {

    return [
        {
            label: "Stream",
            href: `/u/${user?.username}`,
            icon: Fullscreen
        },
        {
            label: "Keys",
            href: `/u/${user?.username}/keys`,
            icon: KeyRound
        },
        {
            label: "Chat",
            href: `/u/${user?.username}/chat`,
            icon: MessageSquareText
        },
        {
            label: "Community",
            href: `/u/${user?.username}/community`,
            icon: Users2
        }
    ]
}

// Stream Settings
export interface StreamSettingType {
    label: string;
    description: string;
    hintlabel?: string;
    value: boolean;
    field: "isChatEnabled" | "isChatFollowersOnly" | "isChatDelayed";
}
export const getStreamSettings = (stream: Stream): StreamSettingType[] => {
    return [
        {
            label: "Enable Chat",
            description: "Enable chat for your stream",
            value: stream?.isChatEnabled,
            field: "isChatEnabled"
        },
        {
            label: "Chat Delayed",
            description: "Delay chat messages by 15 seconds",
            value: stream?.isChatDelayed,
            field: "isChatDelayed"
        }, {
            label: "Chat Followers Only",
            description: "Only allow followers to chat",
            value: stream?.isChatFollowersOnly,
            field: "isChatFollowersOnly"
        }
    ]
}