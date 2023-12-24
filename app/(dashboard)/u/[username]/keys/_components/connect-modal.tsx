"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IngressInput } from "livekit-server-sdk"
import React, { ElementRef, useRef, useTransition } from "react"
import { createIngress } from "@/actions/ingress"
import { toast } from "sonner"
import { useCustomTheme } from "@/store/use-sidebar"
import { useIsClient } from "usehooks-ts"
import { Skeleton } from "@/components/ui/skeleton"

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;
export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null);
    const isClient = useIsClient();
    const [ingressType, setIngressType] = React.useState<IngressType>(RTMP);
    
    const [isPending, startTransition] = useTransition();
    const { theme } = useCustomTheme((state) => state)
    const onSubmit = () => {
        startTransition(() => {
            console.log("submitting", ingressType, typeof ingressType)
            createIngress(parseInt(ingressType)).then((res) => {
                toast.success("Ingress created", { invert: theme === "dark" })
                closeRef?.current?.click();
            })
                .catch((err) => toast.error("Failed to create ingress", { invert: theme === "dark" }))
        })
    }

    if (!isClient) {
        return (
            <Skeleton className="w-36 h-10" />
        );
    }
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">Generate credentials</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate new connection?</DialogTitle>
                </DialogHeader>
                <Select
                    value={ingressType}
                    onValueChange={(value) => setIngressType(value)}
                >
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="Ingress type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP}>RTMP</SelectItem>
                        <SelectItem value={WHIP}>WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <AlertTitle>Warning</AlertTitle>
                    <AlertDescription>
                        This will invalidate your older credentials. Are you sure you want to generate new credentials?
                    </AlertDescription>
                </Alert>
                <div className="flex justify-between">

                    <DialogClose ref={closeRef} asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button variant="primary"
                        onClick={onSubmit}
                        disabled={isPending}
                    >Generate</Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}