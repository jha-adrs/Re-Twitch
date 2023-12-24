"use client"

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client"
import { useEffect, useRef, useState } from "react";
import { FullScreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
    participant: Participant;

}
export const LiveVideo = ({ participant }: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(0);
    const [isMuted, setIsMuted] = useState(false);

    const onVolumeChange = (value: number) => {
        setVolume(+value);
        if(videoRef?.current){
            videoRef.current.muted = value === 0;
            videoRef.current.volume = +value * 0.01;
        }
    };

    const toggleMute = () => {
        const isMuted = volume === 0;
        setVolume(isMuted ? 50 : 0);
        if(videoRef?.current){
            videoRef.current.muted =  !isMuted;
            videoRef.current.volume = isMuted ? 0.5 : 0;
        }
    }

    const toggleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
            setIsFullScreen(false);
        } else if(wrapperRef?.current){
            wrapperRef.current.requestFullscreen();
            setIsFullScreen(true);
        }
    }
    const handleFullScreenChange = () => {
        const isCurrentlyFullScreen = document.fullscreenElement !== null;
        setIsFullScreen(isCurrentlyFullScreen);
    }
    useEventListener("fullscreenchange", handleFullScreenChange, wrapperRef);
    useTracks([Track.Source.Camera, Track.Source.Microphone]).filter((t) => t.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current);
            }
        });

        useEffect(()=>{
            onVolumeChange(0);
        },[])
    return (
        <div className="relative h-full flex" ref={wrapperRef}>
            <video width={"100%"} ref={videoRef} />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-70 transition-all">
                <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
                    <VolumeControl volume={volume} onToggle={toggleMute} onVolumeChange={onVolumeChange} />
                    <FullScreenControl isFullScreen={isFullScreen} onToggle={toggleFullScreen} />

                </div>
            </div>
        </div>
    )
}