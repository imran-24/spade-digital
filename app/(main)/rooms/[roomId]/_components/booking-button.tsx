"use client";

import Button from "@/app/components/Button";
import { useModalStore } from "@/hooks/use-modal-store";
import React from "react";

const BookingButton = ({roomId}: {roomId: string}) => {
  const { onOpen } = useModalStore();

  return (
    <Button outline onClick={() => onOpen("CreateBooking", roomId)} label='Book' />
  );
};

export default BookingButton;
