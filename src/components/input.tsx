import React from 'react'
interface InputProps {
    id: string;
    onChange?: any,
    value?: string,
    label: string,
    type?: string,
    register?: any,
    className?: string,
    classNameLabel?: string
}
const Input: React.FC<InputProps> = ({
    id,
    onChange,
    value,
    label,
    type,
    register,
    className,
    classNameLabel
}) => {

    return (
        <div className='relative'>
            <input
                {...register}
                onChange={onChange}
                id={id}
                type={type}
                value={value}
                className={`
                    pt-6 
                    pb-1
                    w-full
                    text-md
                    text-white  
                    bg-transparent
                    appearance-none
                    focus:outline-none
                    peer 
                    border-b
                    border-black-[40]
                    ${className}  
                `}
                placeholder=''
            />
            <label className={`
                absolute 
                text-md 
                text-zinc-400 
                duration-150 
                transform 
                -translate-y-3 
                scale-75 
                top-4 
                left-0
                z-10  
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:-translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-3
                peer-focus: bg-transparent 
                ${classNameLabel}`}
                htmlFor={id}>
                {label}
            </label>
        </div>
    )
}

export default Input