
import { Suspense } from "react"
import { Container } from "./_components/container"
import { Navbar } from "./_components/navbar"
import Sidebar, { SidebarSkeleton } from "./_components/sidebar"

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="flex pt-14 h-full">
                
                <Suspense fallback={<SidebarSkeleton/>}>
                    <Sidebar />
                    <Container>
                        {children}
                    </Container>
                    <Sidebar />
                </Suspense>
            </div>
        </>
    )
}

export default BrowseLayout
