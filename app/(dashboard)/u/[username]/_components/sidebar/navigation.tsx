"use client"
import { getSiderbarItems } from "@/lib/constants/creator_dasboard";
//import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation"
import  {NavItem, NavItemSkeleton } from "./nav-item";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { Suspense } from "react";

export const Navigation = () => {
    
    const { user, isLoaded, isSignedIn } = useUser();
    const sidebarItems = getSiderbarItems(user);
    const { collapsed } = useCreatorSidebar((state) => state);
    const pathname = usePathname();
    if(!isLoaded){
        return(
            <ul className="space-y-2  pt-4 lg:pt-0">
            {[...Array(4)].map((_, index) => {
                return <NavItemSkeleton key={index} />
            })}
            </ul>
        )
    }
    return (
        <ul className="space-y-2  pt-4 lg:pt-0">
            {isLoaded && sidebarItems.map((item, index) => {
                return <NavItem
                collapsed={collapsed}
                key={index}
                item={item}
                isActive={pathname === item.href}
                />
            })}
            
        </ul>
    )
}
