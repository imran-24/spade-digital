"use client";

import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

import Modal from "./modal";
import Heading from "../Heading";
import { useModalStore } from "@/hooks/use-modal-store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";

// booking schema to match the booking model
const roomSchema = z.object({
  name: z.string().min(3, "Room name must be at least 3 characters"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  amenities: z.string().min(1, "Amenities are required"),
});

const EditRoomModal = () => {
  const router = useRouter();
  const { data: room, onClose, isOpen, type, roomId } = useModalStore();
  const isRoomOpen = type === "editRoom" && isOpen;
  const handleClose = () => onClose();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      name: "",
      capacity: 1,
    },
  });

  React.useEffect(() => {
    if (room) {
      reset({
        name: room.name,
        capacity: room.capacity,
      });
    }
  }, [room, reset]);

  // In the component, update the form fields to include datetime inputs
  const body = (
    <div className='flex flex-col gap-3'>
      <Heading title='Edit Room' subtitle='Edit room for others to join' />
      <div className='flex flex-col gap-3 py-3'>
        <input
          {...register("name")}
          placeholder='Room Name'
          className={"input-primary"}
        />
        {errors.name && (
          <p className='input-error'>{errors.name.message as string}</p>
        )}

        <input
          {...register("capacity", { valueAsNumber: true })}
          type='number'
          placeholder='Capacity'
          className={"input-primary"}
        />
        {errors.capacity && (
          <p className='input-error'>{errors.capacity.message as string}</p>
        )}

        <input
          {...register("amenities")}
          type='text'
          placeholder='Amenities: write it like - wifi, ac, snacks'
          className={"input-primary"}
        />
        {errors.amenities && (
          <p className='input-error'>{errors.amenities.message}</p>
        )}
      </div>
    </div>
  );

  // Update the onSubmit function to include the roomId and userId
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const amenities = data.amenities.split(',').map((item: string) => item.trim());
      const response = await axios.put(`/api/rooms/${roomId}`, {...data, amenities});
      console.log("Room updated:", response.data);
      onClose();
      router.refresh();
    } catch (error) {
      console.error("Error updating room:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      body={body}
      disabled={isLoading}
      actionLabel='Update'
      isOpen={isRoomOpen}
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default EditRoomModal;
