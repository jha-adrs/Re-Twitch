import {create} from "zustand";

interface SideBarStore{
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

export const useSidebar = create<SideBarStore>((set)=> ({
    collapsed: false,
    onExpand: () => set(()=> ({collapsed: false})),
    onCollapse: () => set(()=> ({collapsed: true}))
}));

interface ThemeStore{
    theme: "dark" | "light" | "system";
    onChange: (theme :any) => void;
}

export const useCustomTheme = create<ThemeStore>((set)=> ({
    theme: "dark",
    onChange: (theme) => set(()=> ({theme}))
}));
