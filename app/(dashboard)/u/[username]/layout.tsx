import { getSelfByUsername } from '@/lib/auth-service';
import { notFound, redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { Navbar } from './_components/navbar';
import { Sidebar, SidebarSkeleton } from './_components/sidebar';
import { Container } from './_components/container';
interface CreatorLayoutProps {
    params: { username: string; }
    children: React.ReactNode;
}
const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
    if (!params.username) return notFound();
    const self = await getSelfByUsername(params.username);
    if (!self || self?.username !== params?.username) {
        return notFound();
    };
    return (
        <>
            <Navbar />

            <div className='flex h-full pt-14'>
                <Suspense fallback={<SidebarSkeleton />}>

                    <Sidebar />
                    <Container>
                        {children}
                    </Container>

                </Suspense>
            </div>
        </>
    )
}

export default CreatorLayout

