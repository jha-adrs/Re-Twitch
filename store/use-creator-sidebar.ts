import {create} from "zustand";

interface creatorSideBarStore{
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

export const useCreatorSidebar = create<creatorSideBarStore>((set)=> ({
    collapsed: false,
    onExpand: () => set(()=> ({collapsed: false})),
    onCollapse: () => set(()=> ({collapsed: true}))
}));

