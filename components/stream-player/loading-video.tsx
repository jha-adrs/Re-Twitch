import { Loader2, WifiOff } from "lucide-react";
interface LoadingVideoProps {
    label: string;
}
export  const LoadingVideo = ({label}:LoadingVideoProps) => {
    return (
        <div className="flex flex-col space-y-4 items-center justify-center w-full h-full bg-accent rounded-none">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
            <p className="mt-2 text-md font-semibold text-muted-foreground capitalize">
                {label}                 
            </p>
        </div>
    )
}