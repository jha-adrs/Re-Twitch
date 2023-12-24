import { Skeleton } from "@/components/ui/skeleton";
import { ToggleCardSkeleton } from "./_components/toggle-card"

 const ChatPageSkeleton = () => {
    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-36 h-6" />
            </div>
            <div className="space-y-4">
                {
                    [...Array(3)].map((_, index) => {
                        return (
                            <ToggleCardSkeleton key={index} />
                        )
                    })
                }

            </div>
        </div >
    )
}
export default ChatPageSkeleton;