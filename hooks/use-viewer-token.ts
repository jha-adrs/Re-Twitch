import { toast } from "sonner";
import { useState, useEffect } from "react";

import {JwtPayload, jwtDecode} from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) =>{
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(()=>{
        const createToken = async ()=>{
            try {
                setIsPending(true);
                if(!hostIdentity){
                    throw new Error("Host identity not found");
                }
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);
                
                const decoded = await jwtDecode(viewerToken) as JwtPayload & {name?:string};
                
                const name = decoded?.name;
                const identity = decoded.jti;
                if(name){
                    setName(name);
                }
                if(identity){
                    setIdentity(identity);
                }
                setIsFailed(false);
                
            } catch (error) {
                console.error(error);
                toast.error("Failed to create token");
                
                setIsFailed(true);
            }
            setIsComplete(true);
            setIsPending(false);
        }
        createToken();
    },[hostIdentity]);

    return {token, name, identity, isPending, isFailed, isComplete};
}