"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogContentText, Modal } from '@mui/material'
import FormRegister from './components/formRegister'
import FormLogin from './components/formLogin'

export default function Auth() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className='relative'>
            <div className="relative w-full h-screen flex">
                <div className="w-full lg:w-[630px] shrink-0 bg-[#1C1D21] h-full flex justify-center items-center">
                    <FormLogin handleOpen={handleOpen} />
                </div>
                <div className="banner bg-[#925FE2] flex-1 relative overflow-hidden">
                    <div className="absolute top-[10%] left-1/2 translate-x-[-50%] z-10">
                        <div className='flex flex-col gap-3 text-[#EEE]'>
                            <div className='text-6xl'>
                                <p className='font-bold'>Welcome to</p>
                                <p className='font-normal whitespace-nowrap'>student portal</p>
                            </div>
                            <p className=''>Login to access your account</p>
                        </div>
                    </div>
                    <img src="/banner.png" className='z-10 w-[75%] object-contain bg-repeat absolute bottom-[-15px] right-0' alt="" />
                    <div className='absolute top-0 left-[-70px]'>
                        <img src="/Vector.svg" alt="" />
                    </div>
                    <div className='absolute bottom-0 right-0'>
                        <img src="/Vector1.svg" alt="" />
                    </div>
                    <div className='absolute top-0 right-0'>
                        <img src="/Vector2.svg" alt="" />
                    </div>
                </div>
            </div>
            <div className='overflow-auto'>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll='body'
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                >
                    <DialogContent style={{ padding: 0 }}>
                        <FormRegister handleClose={handleClose} />
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    )
}
