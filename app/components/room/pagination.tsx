import React from "react";

interface PaginationProps{
    currentPage: number;
    setCurrentPage: (value: number) => void;
    totalPages: number
}

const Pagination = ({currentPage, setCurrentPage, totalPages}: PaginationProps) => {
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
      };
  return (
    <div className='flex justify-center gap-2 p-4'>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-3 py-1 rounded bg-gray-100 disabled:opacity-50'
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-3 py-1 rounded bg-gray-100 disabled:opacity-50'
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
