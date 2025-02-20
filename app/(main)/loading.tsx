"use client";

import React from 'react'
import Spinner from '../components/spinner';

const Loading = () => {
  return (
    <div className='mx-auto h-full flex items-center justify-center'>
      <Spinner />
    </div>
  )
}

export default Loading