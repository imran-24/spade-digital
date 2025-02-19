import React from "react";
import RoomClient from "./_components/room-client";
import prisma from "@/lib/prisma";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

const RoomPage = async ({ params }: RoomPageProps) => {
  const room = await prisma.room.findUnique({
    where:{
      id: params.roomId
    },
    include:{
      bookings: {
        orderBy:{
          createdAt: "desc"
        }
      }
    }
  })
  
  if (!room) return;

  return (
    <div className="p-6 h-full">
      <RoomClient room={room}  />
    </div>
  );
};

export default RoomPage;
