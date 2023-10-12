"use client";
import React, {useState} from "react";
import Artists from "@/components/Artists";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    // Handle the search query here and pass it to the Artists component
  };
  return (
    <div className="p-3 mt-6 max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex flex-grow">
          <label htmlFor="artist-name" className="sr-only">
            Artist name
          </label>
          <input
            id="artist-name"
            name="artistName"
            type="text"
            autoComplete="off"
            required
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3.5 py-2.5 text-gray-800 shadow-sm focus:ring focus:ring-indigo-500 focus:ring-opacity-50 sm:text-sm"
            placeholder="Enter artist name"
          />
        </div>
        <button
          type="submit"
          onClick={() => handleSearch(searchQuery)}
          className="w-full md:w-auto rounded-md bg-indigo-500 px-4 py-2.5 text-white text-sm font-semibold shadow-sm hover:bg-indigo-400 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Search
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Artists searchQuery={searchQuery}/>
      </div>
    </div>
  );
}
