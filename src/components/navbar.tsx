'use client'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

interface Menu {
    name: string,
    icon: string,
    url: string
}

const menu: Menu[] = [{
    name: 'Dashboard',
    icon: '/home.svg',
    url: '/dashboard'
}, {
    name: 'Students/ classes',
    icon: '/studentIcon.svg',
    url: '/dashboard/studentfile'
}]

function Menu({ pathname }: { pathname: string }) {
    return (
        menu.map(item => {
            return (
                <Link href={item.url} className={pathname == item.url ? 'text-white' : 'text-white/50'}>
                    <div className='flex pt-[11px] pr[72px] pb-[12px] pl-[16px] items-center'>
                        <div className="flex items-center gap-4">
                            <img src={item.icon} alt="" className={pathname == item.url ? '' : 'opacity-30'} />
                            <span className=' text-sm font-semibold'>{item.name}</span>
                        </div>
                    </div>
                </Link>
            )
        }))
}

export default function Navbar() {
    const pathname = usePathname();
    const [check, setCheck] = useState(true)
    const menuRef = useRef<HTMLDivElement | null>(null);

    const hadleMenu = () => {
        const classDom = menuRef.current?.classList
        // console.log('1', menuRef.current?.style.height == '0px')

        // if (menuRef.current?.style.height == '0px') {
        //     menuRef.current!.style.height = 'auto'
        //     console.log('2', menuRef.current?.style.height)
        //     return;
        // }

        // menuRef.current!.style.height = '0px'

        if (classDom?.contains('h-0')) {
            classDom?.remove('h-0')
            classDom?.add('h-[150px]')
            return;
        }

        classDom?.remove('h-[150px]')
        classDom?.add('h-0')
    }

    return (
        <div>
            <div className='w-[241px] h-full shrink-0 bg-[#925FE2] hidden lg:block'>
                <div className='flex flex-col items-center pt-6 pb-9 gap-3 border-b border-b-[#BDBDBD]'>
                    <img src="/Logo-HCMIU.png" alt="" className='shrink-0 w-[70px] object-contain' />
                    <p className='text-white font-semibold text-sm'>VNU-HCM International University</p>
                </div>
                <div className='flex w-[192px] flex-col gap-2'>
                    <Menu pathname={pathname} />
                </div>
            </div >
            <div className="mobile lg:hidden h-auto  bg-[#925FE2] px-3">
                <div className='flex justify-between items-center h-[70px]'>
                    <img src="/Logo-HCMIU.png" alt="" className='shrink-0 w-[40px] object-contain' />
                    <img src="/nav-icon.svg" alt="" className='shrink-0 w-[20px] object-contain' onClick={hadleMenu} />
                </div>
                <div className='flex flex-col gap-2 transition-height ease-linear duration-500 h-0' ref={menuRef}>
                    <Menu pathname={pathname} />
                    <Link href='/auth' className='text-white/50'>
                        <div className='flex pt-[11px] pr[72px] pb-[12px] pl-[46px] items-center'>
                            <span className=' text-sm font-semibold'>Log out</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}
