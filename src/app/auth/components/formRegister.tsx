import { API_URL } from '@/app/global'
import Input from '@/components/input'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup"
import Spinner from '../../../components/spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

interface IFormRegister {
    userName: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
}

interface Iprops {
    handleClose?: any
}

const schema = yup.object().shape({
    userName: yup.string().required(),
    password: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().required()
})

const classNameInput: string = '!text-black border-black/30 border rounded pl-2 !peer-focus: bg-red'
const classNameLabel: string = 'left-2'


export default function FormRegister({ handleClose }: Iprops) {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormRegister>({
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<IFormRegister> = async (data) => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            if (res.ok) {
                toast.success('Account successfully created', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                })
            } else {
                toast.error('Account creation failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
            setLoading(false);

        } catch (e) {
            return e;
        }
    }

    return (
        <div className='bg-white rounded-md py-1'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col justify-center items-center gap-3 pt-2">
                        <h2 className='text-4xl font-bold'>
                            Register
                        </h2>
                        <p className='text-base font-medium'>
                            Enter your account details
                        </p>
                    </div>
                    <div className='w-full h-[.5px] bg-black/30'></div>
                    <div className='absolute right-4 top-3 cursor-pointer' onClick={handleClose}>
                        <img src="/icon_close.svg" className='w-4' alt="" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 px-4 max-w-[430px]">
                        <div>
                            <Input
                                label='FirstName'
                                id='firstName'
                                type='text'
                                register={register('firstName')}
                                className={classNameInput}
                                classNameLabel={classNameLabel}
                            />
                            <p className='text-red-700 text-sm font-semibold capitalize'>{errors.firstName?.message}</p>
                        </div>
                        <div>
                            <Input
                                label='LastName'
                                id='lastName'
                                type='lastName'
                                register={register('lastName')}
                                className={classNameInput}
                                classNameLabel={classNameLabel}
                            />
                            <p className='text-red-700 text-sm font-semibold capitalize'>{errors.lastName?.message}</p>
                        </div>
                        <div className='col-start-1 col-end-3'>
                            <Input
                                label='Username'
                                id='userNameR'
                                type='text'
                                register={register('userName')}
                                className={classNameInput}
                                classNameLabel={classNameLabel}
                            />
                            <p className='text-red-700 text-sm font-semibold capitalize'>{errors.userName?.message}</p>
                        </div>
                        <div className='col-start-1 col-end-3'>
                            <Input
                                label='Password'
                                id='passwordR'
                                type='password'
                                register={register('password')}
                                className={classNameInput}
                                classNameLabel={classNameLabel}
                            />
                            <p className='text-red-700 text-sm font-semibold capitalize'>{errors.password?.message}</p>
                        </div>
                        <div className='col-start-1 col-end-3'>
                            <Input
                                label='Email'
                                id='email'
                                type='text'
                                register={register('email')}
                                className={classNameInput}
                                classNameLabel={classNameLabel}
                            />
                            <p className='text-red-700 text-sm font-semibold capitalize'>{errors.email?.message}</p>
                        </div>
                        <div className='col-start-1 col-end-3'>
                            <Input
                                label='Phone'
                                id='phone'
                                type='text'
                                register={register('phone')}
                                className={classNameInput}
                                classNameLabel={classNameLabel}
                            />
                            <p className='text-red-700 text-sm font-semibold capitalize'>{errors.phone?.message}</p>
                        </div>
                    </div>
                    <div className="flex justify-center mt-3">
                        <button className='max-h-[48px] bg-[#12476A] py-3 text-white rounded-xl w-[194px] hover:bg-[#274f69] transition mb-5'>
                            {loading ? <Spinner /> : <span> Sign up</span>}
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}
