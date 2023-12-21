import {create} from "zustand";

interface SideBarStore{
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

export const useSidebar = create<SideBarStore>((set)=> ({
    collapsed: true,
    onExpand: () => set(()=> ({collapsed: false})),
    onCollapse: () => set(()=> ({collapsed: true}))
}));

