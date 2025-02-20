"use client";

import { Loader2 } from 'lucide-react';
import React from 'react'

const Spinner = () => {
  return (
    <div>
        <Loader2 className='text-gray-500 animate-spin' />
    </div>
  )
}

export default Spinner