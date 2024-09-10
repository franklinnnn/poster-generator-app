"use client";
import { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { testAlbum } from "../utils/testAlbum";
import { Poster } from "@/components/poster";
import { Results } from "@/components/results";
import ResultProvider, { ResultContext } from "@/components/results-context";
import { Search } from "@/components/search";

const MainPage = () => {
  return (
    <ResultProvider>
      <main className="flex flex-col items-center justify-start gap-6 p-6 min-h-96">
        {/* SEARCH */}

        <Search />
        {/* RESULTS */}

        <Results />
      </main>
    </ResultProvider>
  );
};

export default MainPage;
