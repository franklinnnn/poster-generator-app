"use client";
import { Results } from "@/components/results/results";
import { ResultsLoader } from "@/components/results/results-loader";
import { searchAlbums } from "@/utils/spotify";
import { getConfig, searchMovies } from "@/utils/tmdb";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResultsPage = () => {
  const [results, setResults] = useState({
    query: null,
    items: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const query = searchParams.get("q");
  const type = searchParams.get("type");

  // console.log("results", results);
  // console.log("type", type);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setResults({
        query: null,
        items: null,
      });
      if (type === "movie") {
        searchMovies(query, setResults, setLoading, setError);
      } else {
        searchAlbums(query, setResults, setLoading, setError);
      }
    }
  }, [query, type]);

  return (
    <div className="flex justify-center">
      <Results results={results} type={type} loading={loading} />
    </div>
  );
};

export default ResultsPage;
