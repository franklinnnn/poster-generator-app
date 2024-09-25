"use client";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchType, setSearchType] = useState("album");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() === "") return;
    console.log("searching album", searchQuery);

    const queryParams = new URLSearchParams({
      type: searchType,
      q: searchQuery,
    }).toString();

    router.push(`/results?${queryParams}`);
  };

  return (
    <div className="flex flex-col items-center gap-4 my-4">
      <div className="flex gap-4">
        <button
          className="btn btn-primary rounded-sm"
          value="album"
          onClick={(e) => setSearchType(e.target.value)}
        >
          Album
        </button>
        <button
          className="btn btn-primary rounded-sm"
          value="movie"
          disabled
          onClick={(e) => setSearchType(e.target.value)}
        >
          Movie
        </button>
        <button
          className="btn btn-primary rounded-sm"
          value="anime"
          disabled
          onClick={(e) => setSearchType(e.target.value)}
        >
          Anime
        </button>
      </div>
      <div className="min-w-72 join rounded-sm">
        <input
          type="text"
          placeholder={`Search ${searchType}`}
          // value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={loading}
          className="w-full p-2 join-item border-none outline-none focus:border-none focus:outline-none"
        />
        <button
          className="btn btn-primary join-item"
          onClick={handleSearch}
          disabled={loading}
        >
          <CiSearch size={20} />
        </button>
      </div>
    </div>
  );
};
