'use client'

import { useEffect, useState } from "react"
import CreateRoomModal from "../modals/create-room-modal"
import EditRoomModal from "../modals/edit-room-modal"

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted) return null
  return (
    <div>
        <CreateRoomModal />
        <EditRoomModal />
    </div>
  )
}

export default ModalProvider