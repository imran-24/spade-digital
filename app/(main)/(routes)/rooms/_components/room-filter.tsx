import React from "react";

interface RoomFilterProps {
  capacityFilter: string;
  setCapacityFilter: (value: string) => void;
  amenityFilter: string;
  setAmenityFilter: (value: string) => void;
  uniqueAmenities: string[];
}

const RoomFilter = ({
  amenityFilter,
  capacityFilter,
  setCapacityFilter,
  setAmenityFilter,
  uniqueAmenities,
}: RoomFilterProps) => {
  return (
    <div className='flex justify-between gap-8 p-4'>
      <div className=''>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Minimum Capacity
        </label>
        <select
          value={capacityFilter}
          onChange={(e) => setCapacityFilter(e.target.value)}
          className='w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1'
        >
          <option value=''>All</option>
          {[5, 10, 15, 20, 25].map((cap) => (
            <option key={cap} value={cap}>
              {cap}+ people
            </option>
          ))}
        </select>
      </div>
      <div className=''>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Amenities
        </label>
        <select
          value={amenityFilter}
          onChange={(e) => setAmenityFilter(e.target.value)}
          className='w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-1'
        >
          <option value=''>All</option>
          {uniqueAmenities.map((amenity) => (
            <option key={amenity} value={amenity}>
              {amenity}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RoomFilter;
