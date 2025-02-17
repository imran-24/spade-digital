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
      bookings: true
    }
  })
  
  if (!room) return;

  return (
    <RoomClient room={room}  />
  );
};

export default RoomPage;
