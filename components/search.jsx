"use client";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchType, setSearchType] = useState("album");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    try {
      e.preventDefault();
      if (searchQuery.trim() === "") return;
      console.log("searching album", searchQuery);

      const queryParams = new URLSearchParams({
        type: searchType,
        q: searchQuery,
      }).toString();

      router.push(`/results?${queryParams}`);
    } catch (error) {
      console.log(error);
      alert(`Search error: ${error}`);
    }
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

      <form onSubmit={handleSearch} className="min-w-72 join rounded-sm">
        <input
          type="text"
          placeholder={`Search ${searchType}`}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={loading}
          className="w-full p-2 join-item border-none outline-none focus:border-none focus:outline-none"
        />
        <button
          type="submit"
          className="btn btn-primary join-item"
          disabled={loading}
        >
          <CiSearch size={20} />
        </button>
      </form>
    </div>
  );
};
