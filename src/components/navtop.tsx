'use client'
import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Navtop() {
    const router = useRouter()
    const handleLogout = () => {
        deleteCookie('token')
        router.push('/auth')
    }
    return (
        <div className="pt-[19px] pb-[25px] hidden lg:block">
            <div className='flex items-center justify-end'>
                <span className='text-[#424242] font-semibold text-sm w-[120px] p-2 cursor-pointer' onClick={handleLogout}>Log out</span>
            </div>
        </div>
    )
}
