import { Check } from 'lucide-react';
import React from 'react';
import Check2 from "@/public/Vector.svg"
import Image from 'next/image';
export const VerifiedMark = () => {
    return (
        <div className="cap">
            <div className="cap-inner">
                {/* <Check className='h-[10px] w-[10px] text-white stroke-[4px]' /> */}
                <Image src={Check2} alt="check" width={15} height={15}/>
            </div>
        </div>
    );
};