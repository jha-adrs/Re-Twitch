'use client'
import Image from 'next/image'
import { useEffect } from 'react'
import ErrorSvg from "../public/error.svg"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCustomTheme } from '@/store/use-sidebar'
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])
    const { theme } = useCustomTheme((state) => state)
    return (
        <div className='flex flex-col h-screen w-screen items-center justify-center'>
            <h2 className='text-3xl font-bold text-primary'>Something went wrong!</h2>
            <Image src={ErrorSvg} alt="Error Page" width={400} height={400} />
            <div className="flex flex-col gap-y-4 items-center justify-between">
                <Button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </Button>
                <Link href={"/"}>
                    <Button variant={"primary"}>
                        Home Page
                    </Button>
                </Link>
            </div>
        </div>
    )
}