"use client"
import React, { Dispatch, SetStateAction, useState } from 'react'
import qs from "query-string"
import { SearchIcon, X } from "lucide-react"
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const Search = () => {
    const router = useRouter();
    const [search, setSearch] = useState('') as [string, Dispatch<SetStateAction<string>>];
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!search) return;
        const url = qs.stringifyUrl({
            url: '/search',
            query: { term: search }
        }, { skipEmptyString: true });
        router.push(url);
    }
    const onClear = () => { 
        setSearch('');
        //router.push('/');
    }
    return (
        <form className='relative w-full lg:w-[400px] flex items-center '
            onSubmit={onSubmit}>
            <Input placeholder='Search'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={
                    (e) => {
                        if (e.key === 'Escape') {
                            onClear();
                        }
                    }
                }
                className='rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0' />
                {
                    search && (
                    <X 

                    className="cursor-pointer absolute top-2.5 right-14 h-5 w-5 text-muted-foreground hover:opacity-75 transition" 
                    onClick={onClear} />
                    )
                }
            <Button type="submit" size="sm" variant="secondary" className='rounded-l-none'>
                <SearchIcon className='w-5 h-5 text-muted-foreground' />
            </Button>
        </form>
    )
}

export default Search
