import { cn } from "@/lib/utils"
import { SproutIcon, Tv2 } from "lucide-react"
import Link from "next/link"

export const Logo = () => {
    return (
        <Link href="/">
            <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="bg-background rounded-full p-1">
                    <SproutIcon className="w-10 h-10 text-primary" />

                </div>
                <div>
                    <p className="text-md font-semibold">ReTwitch</p>
                    <p className="text-xs text-muted-foreground">Reinventing Twitch</p>
                </div>
            </div>
        </Link>
    )
}