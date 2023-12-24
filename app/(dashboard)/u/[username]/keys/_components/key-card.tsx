"use client";

import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import React from "react";
import { EyeIcon, EyeOff } from "lucide-react";

interface KeyCardProps {
    value: string | null;
}
export const KeyCard = ({ value }: KeyCardProps) => {
    const [show, setShow] = React.useState(false);
    const onShow = () => {
        setShow((prev) => !prev);
    }
    return (
        <div className='rounded-xl bg-accent p-4'>
            <div className="items-center ">

                <div className="flex items-center justify-between">
                    <p className="font-semibold shrink-0 mr-4">
                        Stream Key
                    </p>
                    <div className=" space-y-2 w-full">
                        <div className="w-full flex  items-center gap-x-2">
                            <Input
                                value={value || ""}
                                type={show ? "text" : "password"}
                                readOnly
                                placeholder='Your stream key'
                            />
                            <CopyButton value={value || ""} />
                        </div>

                    </div>
                    
                <Button
                    onClick={onShow}
                    variant={"ghost"}>
                    {show ? (<EyeIcon className="w-4 h-4 mr-2 transition-all" />) : (<EyeOff className="w-4 h-4 mr-2 transition-all" />)}
                    {show ? "Hide" : "Show"}
                </Button>
                </div>
            </div>
        </div>
    )
}