"use client"

import { Maximize, Minimize } from "lucide-react";
import { Hint } from "../hint";

interface FullScreenControlProps {
    isFullScreen: boolean;
    onToggle: () => void;
}

export const FullScreenControl = ({isFullScreen,onToggle}:FullScreenControlProps) => {

    const Icon = isFullScreen ? Minimize : Maximize;
    const label = isFullScreen ? "Exit full screen" : "Enter full screen";
    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button onClick={onToggle} className="p-2 rounded-lg hover:foreground hover:bg-opacity-100">
                    <Icon className="h-6 w-6 text-foreground" />
                </button>
            </Hint>
        </div>
    )
}