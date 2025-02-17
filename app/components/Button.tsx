'use client'
import React from 'react'

interface ButtonInterface{
    label: string,
    onClick:(e: React.MouseEvent<HTMLButtonElement>)=> void,
    disabled?: boolean,
    small?: boolean,
    outline?: boolean,
}
const Button: React.FC<ButtonInterface> = ({
    label,
    outline,
    onClick,
    disabled,
    small
}) => {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    className={
        `transition disabled:opacity-70  disabled:cursor-not-allowed rounded-lg font-semibold
        flex items-center justify-center gap-3
        ${disabled ? "cursor-not-allowed" : ''}
        px-4
        py-2
        ${outline ? 'text-black border-neutral-400 font-semibold' : 'text-white'}
        ${outline ? 'bg-neutral-200' : 'bg-black'}
        ${outline ? 'hover:bg-neutral-300' : 'hover:bg-black/90'}
        ${small ? "text-sm" : ""}
        `
    }>
        {label}
    </button>
  )
}

export default Button