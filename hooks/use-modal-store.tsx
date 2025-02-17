import { Room } from '@prisma/client'
import {create} from 'zustand'

export type ModalType =
  | "createRoom"
  | "CreateBooking"
  | "editRoom"


interface ModalStore{
    type:ModalType | null,
    roomId?: string,
    isOpen: boolean,
    data: Room | null,
    onOpen: (type: ModalType, roomId?: string, room?: Room)=> void,
    onClose: ()=> void,
}

export const useModalStore = create<ModalStore>((set) => ({
    isOpen: false,
    type: null,
    data: null,
    onOpen: (type, roomId, room) => set({ isOpen: true, type, roomId, data :room }),
    onClose: () => set({type: null, isOpen: false})
}))