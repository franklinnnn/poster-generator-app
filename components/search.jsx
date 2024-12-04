"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { Bounce } from "react-toastify";

export const Search = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchType, setSearchType] = useState("album");
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    try {
      e.preventDefault();
      if (!searchQuery || searchQuery === "") {
        console.log("null");
        toast.error("🦄 Wow so easy!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      // if (searchQuery.trim() === "") return;
      console.log("searching album", searchQuery);

      const queryParams = new URLSearchParams({
        type: searchType,
        q: searchQuery,
      }).toString();

      if (
        searchQuery &&
        searchQuery.includes("https://open.spotify.com/album")
      ) {
        router.push(`/album/${searchQuery.slice(31, 53)}`);
      } else {
        router.push(`/results?${queryParams}`);
      }
    } catch (error) {
      console.log(error);
      alert(`Search error: ${error}`);
    }
  };

  const handleMovieSearch = (e) => {
    try {
      e.preventDefault();
      if (searchQuery.trim() === "") return;
      console.log("searching movie", searchQuery);

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
        {/* <button
          className={`btn rounded-sm ${
            searchType === "album" ? "btn-primary" : "btn-outline"
          }`}
          value="album"
          onClick={(e) => setSearchType(e.target.value)}
        >
          Album
        </button> */}
        {/* <button
          className={`btn rounded-sm ${
            searchType === "movie" ? "btn-primary" : "btn-outline"
          }`}
          value="movie"
          onClick={(e) => setSearchType(e.target.value)}
        >
          Movie
        </button> */}
        {/* <button
          className="btn btn-primary rounded-sm"
          value="anime"
          disabled
          onClick={(e) => setSearchType(e.target.value)}
        >
          Anime
        </button> */}
      </div>

      <form
        onSubmit={searchType === "album" ? handleSearch : handleMovieSearch}
        className="min-w-96 join rounded-sm"
      >
        <input
          type="text"
          placeholder={`Search ${searchType} or paste Spotify album link`}
          onChange={(e) => setSearchQuery(e.target.value)}
          disabled={loading}
          className="w-full p-2 join-item border-none outline-none focus:border-none focus:outline-none"
        />
        <button
          type="submit"
          className="btn btn-primary join-item"
          disabled={loading || !searchQuery}
        >
          <CiSearch size={20} />
        </button>
      </form>
    </div>
  );
};
