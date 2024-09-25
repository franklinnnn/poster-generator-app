"use client";
import { Results } from "@/components/results";
import { ResultsLoader } from "@/components/results-loader";
import { searchAlbums } from "@/utils/spotify";
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

  console.log(results);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchAlbums(query, setResults, setLoading, setError);
    }
  }, [query]);

  return (
    <div className="flex justify-center">
      <Results results={results} loading={loading} />
    </div>
  );
};

export default ResultsPage;
