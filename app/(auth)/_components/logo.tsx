import { cn } from "@/lib/utils"
import { SproutIcon, Tv2 } from "lucide-react"


export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-foreground rounded-full p-2">
                <Tv2 size={64} className="text-background p-1" />
            </div>

            <div className="flex flex-col items-center">
                <p className="text-primary text-xl font-semibold">
                    Re-Twitch
                </p>

                <p className="text-sm text-muted-foreground">
                    Time to GO LIVE!
                </p>
            </div>
        </div>
    )
}