"use client";

import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='mx-auto h-full flex items-center justify-center'>
        <Loader2 className='text-gray-500 animate-spin' />
    </div>
  )
}

export default Loading