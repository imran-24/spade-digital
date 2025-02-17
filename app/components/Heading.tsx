'use client'
import React from 'react'

interface HeadingInterface{
    title: string,
    subtitle: string,
    center?: boolean,
    small?: boolean
}

const Heading: React.FC<HeadingInterface> = ({
    title,
    subtitle,
    center,
}) => {
  return (
    <div className={`flex flex-col ${center ? 'items-center justify-center' : 'items-start'}`}>
        <p className='text-lg'>
            {title}
        </p>
        <p className='text-sm text-neutral-500'>
            {subtitle}
        </p>
    </div>
  )
}

export default Heading