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
const bookingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start time",
  }),
  endTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid end time",
  }),
});

const CreateBookingModal = () => {
  const router = useRouter();
  const modalStore = useModalStore();
  const isRoomOpen = modalStore.type === "CreateBooking" && modalStore.isOpen;
  const onClose = () => modalStore.onClose();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  // In the component, update the form fields to include datetime inputs
  const body = (
    <div className='flex flex-col gap-3'>
      <Heading title='Create Booking' subtitle='Book this room' />
      <div className='flex flex-col gap-3 py-3'>
        <input
          {...register("title")}
          placeholder='Title'
          className='input-primary'
        />
        {errors.title && (
          <p className='input-error'>{errors.title?.message?.toString()}</p>
        )}

        <textarea
          {...register("description")}
          placeholder='Description (optional)'
          className='input-primary'
        />
        {errors.description && (
          <p className='input-error'>
            {errors.description?.message?.toString()}
          </p>
        )}

        <input
          {...register("startTime")}
          type='datetime-local'
          className='input-primary'
        />
        {errors.startTime && (
          <p className='input-error'>{errors.startTime?.message?.toString()}</p>
        )}

        <input
          {...register("endTime")}
          type='datetime-local'
          className='input-primary'
        />
        {errors.endTime && (
          <p className='input-error'>{errors.endTime?.message?.toString()}</p>
        )}
      </div>
    </div>
  );

  // Update the onSubmit function to include the roomId and userId
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/bookings", {
        ...data,
        roomId: modalStore.roomId,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      });
      console.log("Booking created:", response.data);
      modalStore.onClose();
      router.refresh();
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

export default CreateBookingModal;
