import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Hint } from "../hint";
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
    volume: number;
    onToggle: () => void;
    onVolumeChange: (volume:number) => void;
}   

export const VolumeControl = ({volume,onToggle,onVolumeChange}:VolumeControlProps) => {
    const Icon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;
    const label = volume === 0 ? "Unmute" : "Mute";
    const handleChange = (value:number[])=>{
        onVolumeChange(value[0]);
    }
    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button onClick={onToggle} className="p-2 rounded-lg hover:foreground hover:bg-opacity-100">
                    <Icon className="h-6 w-6 text-foreground" />
                </button>
            </Hint>
            <Slider
            
                min={0}
                max={100}
                step={1}
                value={[volume]}
                onValueChange={handleChange}
                className="w-24"
            />
        </div>
    )
}