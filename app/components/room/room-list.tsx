"use client";

import React from "react";
import Button from "../Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useModalStore } from "@/hooks/use-modal-store";
import { Room } from "@prisma/client";
import { RoomsWithBookingsProps } from "../rooms";
import { Eye, Heart } from "lucide-react";

const RoomList = ({ rooms, admin }: RoomsWithBookingsProps) => {
  const [favoriteRooms, setFavoriteRooms] = React.useState<Room[]>([]);
  const [lastVisited, setLastVisited] = React.useState<Room | null>(null);

  React.useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favoriteRooms") || "[]"
    );
    const storedLastVisited = JSON.parse(
      localStorage.getItem("lastRoom") || "null"
    );
    setFavoriteRooms(storedFavorites);
    setLastVisited(storedLastVisited);
  }, []);

  const router = useRouter();
  const modalStore = useModalStore();
  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        await axios.delete(`/api/rooms/${id}`);
        router.refresh();
      } catch (error) {
        window.alert("Remove all the bookings before deleting room!");
        console.log(error);
      }
    }
  };

  const handleEdit = (e: React.MouseEvent, room: Room) => {
    e.stopPropagation(); // Prevent navigation when clicking edit
    modalStore.onOpen("editRoom", room.id, room);
  };
  return (
    <div className='space-y-4'>
      <div className='overflow-x-auto rounded-lg '>
        <table className='min-w-full divide-y divide-gray-100'>
          <thead className=' bg-gray-50'>
            <tr>
              <th className=' px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Room Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Available Slots
              </th>
              {/* {admin && ( */}
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
              {/* )} */}
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-100'>
            {rooms.map((room) => (
              <tr
                key={room.id}
                onClick={() => router.push(`/rooms/${room.id}`)}
                className='hover:bg-gray-50 cursor-pointer'
              >
                <td className='px-6 py-2 whitespace-nowrap capitalize'>
                  {room.name}
                </td>

                <td className='px-6 py-2 whitespace-nowrap text-center'>
                  <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-xl'>
                    {room.capacity - room.bookings.length} slots
                  </span>
                </td>

                <td className='px-6 py-2 whitespace-nowrap'>
                  <div className='flex items-center justify-between  gap-2'>
                    {admin && (
                      <div className='flex gap-2'>
                        <Button
                          small
                          onClick={(e) => handleEdit(e, room)}
                          label='Edit'
                        />
                        <Button
                          small
                          onClick={(e) => handleDelete(e, room.id)}
                          label='Delete'
                        />
                      </div>
                    )}
                    <div className='flex items-center'>
                      {favoriteRooms.some(
                        (favRoom) => favRoom.id === room.id
                      ) ? (
                        <Heart className='fill-rose-500 text-rose-500 size-4' />
                      ) : (
                        <div className='size-4' />
                      )}
                      {lastVisited?.id === room.id && (
                        <span className='ml-2 text-sm text-gray-500'>
                          <Eye className=' size-4' />
                        </span>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomList;
