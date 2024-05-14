import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onClick: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onClick,
}) => {
  return (
    <div className='mt-4 flex space-x-2 items-center'>
      <button
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50 flex items-center'
      >
        <FaArrowLeft />
      </button>
      <span className='text-md'>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='px-4 py-2 bg-gray-300 text-black rounded disabled:opacity-50 flex items-center'
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
