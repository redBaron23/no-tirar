import React from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineDownload } from "react-icons/hi";
import { MdOutlineFilterAlt } from "react-icons/md";

const OrderSearchBar = () => {
  return (
    <div className="flex w-full items-center space-x-2">
      <div className="flex flex-grow items-center space-x-2 rounded-full border p-2 px-4 shadow-sm">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="ID del pedido"
          className="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>
      <button className="flex items-center justify-center rounded-full border p-2 text-gray-600 hover:bg-gray-200">
        <MdOutlineFilterAlt className="h-6 w-6" />
      </button>
      <button className="flex items-center justify-center rounded-full border p-2 text-gray-600 hover:bg-gray-200">
        <HiOutlineDownload className="h-6 w-6" />
      </button>
    </div>
  );
};

export default OrderSearchBar;
