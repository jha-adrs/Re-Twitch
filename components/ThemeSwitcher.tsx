"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCustomTheme } from "@/store/use-sidebar"

export function ModeToggle({...props}) {
    const { setTheme } = useTheme();
    const {theme,onChange} = useCustomTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="aspect-square" {...props}>
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {
                    setTheme("light")
                    onChange("system");
                }}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    setTheme("dark")
                    onChange("dark");
                }}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {
                    setTheme("system");
                    onChange("system");
                }}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
