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
    <div className='max-w-3xl mx-auto p-4 flex flex-wrap gap-6'>
      <div className='flex-1 min-w-[200px]'>
        <label className='block text-sm font-semibold text-gray-600 mb-2'>
          Minimum Capacity
        </label>
        <select
          value={capacityFilter}
          onChange={(e) => setCapacityFilter(e.target.value)}
          className='w-full px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm 
                hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
        >
          <option value=''>All</option>
          {[5, 10, 15, 20, 25].map((cap) => (
            <option key={cap} value={cap}>
              {cap}+ people
            </option>
          ))}
        </select>
      </div>
      <div className='flex-1 min-w-[200px]'>
        <label className='block text-sm font-semibold text-gray-600 mb-2'>
          Amenities
        </label>
        <select
          value={amenityFilter}
          onChange={(e) => setAmenityFilter(e.target.value)}
          className='w-full px-4 py-2 rounded-lg border border-gray-200 bg-white shadow-sm 
                hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all'
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
