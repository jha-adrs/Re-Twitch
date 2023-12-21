import { cn } from "@/lib/utils"
import { SproutIcon, Tv2 } from "lucide-react"
import Link from "next/link"

export const Logo = () => {
    return (
        <Link href="/">
            <div className=" lg:flex items-center gap-x-4 hover:opacity-75 transition mr-2">
                <div className="bg-background rounded-full p-2">
                    <Tv2 className="w-5 h-5 lg:w-8 lg:h-8 text-primary" />
                </div>
                <div className="hidden lg:block">
                    <p className="text-md font-semibold">ReTwitch</p>
                    <p className="text-xs text-muted-foreground">Reinventing Twitch</p>
                </div>
            </div>
        </Link>
    )
}