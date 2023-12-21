import { Navbar } from "./_components/navbar"

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="flex pt-20 h-full">
                {children}
            </div>
        </>
    )
}

export default BrowseLayout
