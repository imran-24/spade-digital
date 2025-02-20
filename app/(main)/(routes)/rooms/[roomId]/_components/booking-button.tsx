"use client";

import { useModalStore } from "@/hooks/use-modal-store";
import Link from "next/link";
import React from "react";

const BookingButton = ({ roomId }: { roomId: string }) => {
  const { onOpen } = useModalStore();

  return (
    <Link
      className="border rounded-md p-2 bg-neutral-200 hover:bg-neutral-300 transition-colors ease-in-out text-sm font-semibold"
      href={`/rooms/${roomId}/booking/create`}
      onClick={() => onOpen("CreateBooking", roomId)}
    >
        Make bookings
    </Link>
  );
};

export default BookingButton;
