
import { Clapperboard } from "lucide-react"
import Link from "next/link"

export const Logo = () => {
    return (
        <Link href="/">
            <div className=" lg:flex items-center gap-x-4 hover:opacity-75 transition mr-2">
                <div className="bg-background rounded-full p-2 bg-violet-700">
                    <Clapperboard className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="hidden lg:block">
                    <p className="text-md font-semibold">ReTwitch</p>
                    <p className="text-xs text-muted-foreground">Creator dashboard</p>
                </div>
            </div>
        </Link>
    )
}