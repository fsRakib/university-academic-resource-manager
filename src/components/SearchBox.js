"use client";
import React, { useState } from "react";
import { IoSearch, IoSearchOutline } from "react-icons/io5";

const SearchComponent = () => {
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    // Simulate a search action with a timeout
    setTimeout(() => {
      setLoading(false);
      // Implement the actual search logic here
    }, 2000);
  };

  return (
    <div id="search-bar" class=" bg-black  shadow-lg rounded-lg h-12 w-full">
      <form class="flex p-1 h-full">
        <input
          type="text"
          placeholder="Search..."
          class="w-full h-full text-xl text-black rounded-lg px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <button
          type="submit"
          class="bg-black h-full text-xl text-white rounded-lg px-4  ml-1 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchComponent;
