import { getSelfByUsername } from '@/lib/auth-service';
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import { Navbar } from './_components/navbar';
interface CreatorLayoutProps {
    params: { username: string; }
    children: React.ReactNode;
}
const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
    if (!params.username) return notFound();
    const self = await getSelfByUsername(params.username);
    if (!self) {
        return redirect("/");
    };
    return (
        <>
        <Navbar />
        <div className='flex h-full pt-20'>
            {children}
        </div>
        </>
    )
}

export default CreatorLayout
