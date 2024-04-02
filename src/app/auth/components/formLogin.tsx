import { API_URL } from '@/app/global'
import Input from '@/components/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from "yup"
import Spinner from '../../../components/spinner'

interface IFormInput {
    password: string,
    userName: string
}

interface Iprops {
    handleOpen: any
}

const schema = yup
    .object({
        userName: yup.string().required(),
        password: yup.string().required()
    })
    .required()


export default function FormLogin({ handleOpen }: Iprops) {
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [errorForm, setErrorForm] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormInput>({
        resolver: yupResolver(schema),
    })

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const { userName, password } = data;
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName,
                    password,
                }),
            })
            if (res.ok) {
                const token = await res.json()
                console.log(token.ok);

                setCookie('token', token, { maxAge: 60 * 6 * 24 })
                router.push('/dashboard')
            } else {
                setLoading(false)
                setErrorForm(true)
            }

        } catch (e) {
            return e;
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-12 p-2">
                <div className="flex flex-col items-start gap-3">
                    <h2 className='text-white text-4xl font-bold'>
                        Sign in
                    </h2>
                    <p className='text-base font-medium text-rgba-white'>
                        Enter your account details
                    </p>
                </div>
                <div className="flex flex-col gap-5">
                    <Input
                        label='Username'
                        id='userName'
                        type='text'
                        register={register('userName')}
                    />
                    <p className='text-red-400 capitalize'>{errors.userName?.message}</p>
                    <Input
                        label='Password'
                        id='password'
                        type='password'
                        register={register('password')}
                    />
                    <p className='text-red-400 capitalize'>{errors.password?.message}</p>
                    <button className='bg-[#9C6FE4] py-3 text-white rounded-xl w-full md:w-[393px] hover:bg-[#9365dd] transition'>
                        {loading ? <Spinner /> : <span>Login</span>}
                    </button>
                    {errorForm && <p className='text-red-400 normal-case'>
                        Account or password is incorrect</p>}
                </div>
            </div>
            <p className='text-neutral-500 mt-12'>
                Don’t have an account?
                <span className='text-white cursor-pointer hover:underline ml-2' onClick={handleOpen}>
                    Create an account
                </span>
            </p>
        </form>
    )
}
