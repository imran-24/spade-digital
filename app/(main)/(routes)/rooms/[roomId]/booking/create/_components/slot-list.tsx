"use client";

import React from "react";

interface SlotListProps {
  allSlots: string[];
  unavailableSlots: string[];
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
}

const SlotList = ({
  allSlots,
  selectedSlot,
  onSelect,
  unavailableSlots,
}: SlotListProps) => {
  return (
    <div className='grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-6   gap-2'>
      {allSlots.map((slot) => (
        <button
          key={slot}
          onClick={() => onSelect(slot)}
          disabled={unavailableSlots.includes(slot)}
          className={`
                p-3 rounded-lg transition-all duration-200 font-medium text-sm
                ${
                  unavailableSlots.includes(slot)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : selectedSlot === slot
                    ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transform hover:scale-105"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-md"
                }
                `}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

export default SlotList;
