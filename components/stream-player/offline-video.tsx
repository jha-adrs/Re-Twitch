import { WifiOff } from "lucide-react";

interface offlineVideoProps {
    username: string;
}
export  const OfflineVideo = ({username}:offlineVideoProps) => {
    return (
        <div className="flex flex-col space-y-4 items-center justify-center w-full h-full bg-accent rounded-none">
            <WifiOff className="h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-md font-semibold text-muted-foreground">{username} is offline</p>
        </div>
    )
}