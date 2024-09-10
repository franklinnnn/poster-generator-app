import React, { useContext, useState } from "react";
import { ResultContext } from "./results-context";
import { CiSearch } from "react-icons/ci";
import { searchAlbums } from "@/utils/spotify";

export const Search = () => {
  const { setResults, setShowResults, loading, setLoading, setError } =
    useContext(ResultContext);

  const [searchQuery, setSearchQuery] = useState(null);
  const [searchType, setSearchType] = useState("Album");
  const handleSearch = () => {
    console.log("searching album", searchQuery);
    searchAlbums(searchQuery, setResults, setLoading, setError);
    setShowResults(true);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <button
          className="btn btn-primary"
          value="Album"
          onClick={(e) => setSearchType(e.target.value)}
        >
          Album
        </button>
        <button
          className="btn btn-primary"
          value="Movie"
          disabled
          onClick={(e) => setSearchType(e.target.value)}
        >
          Movie
        </button>
        <button
          className="btn btn-primary"
          value="Anime"
          disabled
          onClick={(e) => setSearchType(e.target.value)}
        >
          Anime
        </button>
      </div>
      <div className="min-w-72 join">
        <input
          type="text"
          placeholder={`Search ${searchType}`}
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
