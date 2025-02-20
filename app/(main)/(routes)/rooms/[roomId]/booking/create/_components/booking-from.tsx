"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import DateSlotPicker from "./date-slot-picker";
import axios from "axios";
import { Booking, Room } from "@prisma/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";

// booking schema to match the booking model
const bookingSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start time",
  }),
  photoUrl: z.string().optional(),
});

interface BooingFormProps {
  roomId: string;
  room: Room & {
    bookings: Booking[];
  };
}

const BookingFrom = ({ roomId, room }: BooingFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  const [buffer, setBuffer] = useState<File | null>(null);

  const onImagChange = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setBuffer(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    console.log(file);
    const fileRef = ref(storage, `/rooms/${roomId}/bookings`);
    // Upload the file
    await uploadBytes(fileRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(fileRef);
    console.log(downloadURL);
    setValue("photoUrl", downloadURL);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      if (buffer) uploadImage(buffer!);

      const startTime = new Date(data.startTime);
      const endTime = new Date(startTime.getTime() + 30 * 60000); // Add 30 minutes in milliseconds

      const response = await axios.post("/api/bookings", {
        ...data,
        roomId: roomId,
        startTime,
        endTime,
      });
      console.log("Booking created:", response.data);
      router.refresh();
    } catch (error) {
      console.error("Error creating booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-4 py-3'>
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
          type='file'
          onChange={(e) => onImagChange(e.target.files)}
          accept='image/*'
          placeholder='Photo URL (optional)'
        />

        <DateSlotPicker setStartDate={setValue} bookings={room.bookings} />
        {errors.startTime && (
          <p className='input-error'>{errors.startTime?.message?.toString()}</p>
        )}
      </div>
      <button
        className='bg-black text-white p-2 px-4 rounded-lg text-sm font-semibold border'
        type='submit'
        disabled={isLoading}
      >
        {isLoading ? "Creating..." : "Submit"}
      </button>
    </form>
  );
};

export default BookingFrom;
