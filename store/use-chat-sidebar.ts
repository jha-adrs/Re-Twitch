import {create} from "zustand";

export enum Chatvariant {
    CHAT = "CHAT",
    COMMUNITY = "COMMUNITY",
}

interface chatSideBarStore{
    collapsed: boolean;
    variant: Chatvariant;
    onExpand: () => void;
    onCollapse: () => void;
    onChangeVariant: (variant: Chatvariant) => void;
}

export const useChatSidebar = create<chatSideBarStore>((set)=> ({
    collapsed: false,
    variant: Chatvariant.CHAT,
    onExpand: () => set(()=> ({collapsed: false})),
    onCollapse: () => set(()=> ({collapsed: true})),
    onChangeVariant: (variant: Chatvariant) => set(()=> ({variant})),
}));

