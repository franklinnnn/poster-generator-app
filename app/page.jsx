"use client";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { testAlbum } from "../utils/testAlbum";
import { Poster } from "@/components/poster";
import { Results } from "@/components/results";

const MainPage = () => {
  const [searchType, setSearchType] = useState("Album");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [showSelectedResults, setShowSelectedResults] = useState(false);

  const handleSearch = () => {
    setShowSelectedResults(false);
    console.log("show results");
    setShowResults(true);
  };

  return (
    <main className="flex flex-col items-center justify-start gap-6 p-6 min-h-96">
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
          onClick={(e) => setSearchType(e.target.value)}
        >
          Movie
        </button>
        <button
          className="btn btn-primary"
          value="Anime"
          onClick={(e) => setSearchType(e.target.value)}
        >
          Anime
        </button>
      </div>

      {/* SEARCH */}
      <div className="min-w-72 join">
        <input
          type="text"
          placeholder={`Search ${searchType}`}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 join-item border-none outline-none focus:border-none focus:outline-none"
        />
        <button className="btn btn-primary join-item" onClick={handleSearch}>
          <CiSearch size={20} />
        </button>
      </div>

      {/* RESULTS */}
      {showResults && (
        <Results
          setShowResults={setShowResults}
          setShowSelectedResults={setShowSelectedResults}
          searchQuery={searchQuery}
        />
      )}

      {/* POSTER */}
      {showSelectedResults && <Poster />}
    </main>
  );
};

export default MainPage;
