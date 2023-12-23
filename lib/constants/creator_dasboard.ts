// Contains all the constants for the creator dashboard

import { Fullscreen, KeyRound, LucideIcon, MessageSquareText, Users2 } from "lucide-react";
import {UserResource} from "@clerk/types"
// Sidebar Items
export interface SidebarItemType {
    label: string;
    href: string;
    icon: LucideIcon;
    hintlabel?: string;

}

type UserProp = UserResource | null | undefined;

export type SidebarItemsType = SidebarItemType[];


export const getSiderbarItems = (user:UserProp): SidebarItemType[] => {
    
    return [
        {
            label: "Stream",
            href: `u/${user?.username}`,
            icon: Fullscreen
        },
        {
            label: "Keys",
            href: `u/${user?.username}/keys`,
            icon: KeyRound
        },
        {
            label: "Chat",
            href: `u/${user?.username}/chat`,
            icon: MessageSquareText
        },
        {
            label: "Community",
            href: `u/${user?.username}/community`,
            icon: Users2
        }
    ]
}