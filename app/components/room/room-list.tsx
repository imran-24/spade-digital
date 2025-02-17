import React from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useModalStore } from "@/hooks/use-modal-store";
import { Room } from "@prisma/client";
import { RoomsWithBookingsProps } from "../rooms";

const RoomList = ({rooms}: RoomsWithBookingsProps ) => {
  const router = useRouter();
  const modalStore = useModalStore();
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`/api/rooms/${id}`);
        router.refresh();
      } catch (error) {
        window.alert(error);
        console.log(error);
      }
    }
  };

  const handleEdit = (e: React.MouseEvent, room: Room) => {
    e.stopPropagation(); // Prevent navigation when clicking edit
    modalStore.onOpen("editRoom", room.id, room);
  };
  return (
    <div>
      {rooms.map((room) => (
        <div
          key={room.id}
          onClick={() => router.push(`/rooms/${room.id}`)}
          className='flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer border-b'
        >
          <div className='capitalize'>{room.name}</div>
          <div>
            <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded-xl'>
              {room.capacity - room.bookings.length} slots
            </span>
          </div>
          <div className='flex gap-2'>
            <Button small onClick={(e) => handleEdit(e, room)} label='Edit' />
            <Button
              small
              onClick={(e) => handleDelete(e, room.id)}
              label='Delete'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;
