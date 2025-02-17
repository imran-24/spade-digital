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

// Define validation schema using Zod
const roomSchema = z.object({
  name: z.string().min(3, "Room name must be at least 3 characters"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  amenities: z.string().min(1, "Amenities are required"),
});

const CreateRoomModal = () => {
  const router = useRouter();
  const modalStore = useModalStore();
  const isRoomOpen = modalStore.type === "createRoom" && modalStore.isOpen;
  const onClose = () => modalStore.onClose();

  const [isLoading, setIsLoading] = useState(false);

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(roomSchema),
      defaultValues: {
        name: "",
        capacity: 1,
      },
    });

const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
        setIsLoading(true);
        const amenities = data.amenities.split(',').map((item: string) => item.trim());
        const response = await axios.post('/api/rooms', {...data, amenities});
        console.log('Room created:', response.data);
        modalStore.onClose();
        router.refresh();
    } catch (error) {
        console.error('Error creating room:', error);
    } finally {
        setIsLoading(false);
    }
};

  const body = (
    <div className='flex flex-col gap-3'>
      <Heading title='Create Room' subtitle='Create room for others to join' />
      <div className='flex flex-col gap-3 py-3'>
        <input
          {...register("name")}
          placeholder='Room Name'
          className={"input-primary"}
        />
        {errors.name && <p className='input-error'>{errors.name.message}</p>}

        <input
          {...register("capacity", { valueAsNumber: true })}
          type='number'
          placeholder='Capacity'
          className={"input-primary"}
        />
        {errors.capacity && (
          <p className='input-error'>{errors.capacity.message}</p>
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

  return (
    <Modal
      body={body}
      disabled={isLoading}
      actionLabel='Create'
      isOpen={isRoomOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default CreateRoomModal;
