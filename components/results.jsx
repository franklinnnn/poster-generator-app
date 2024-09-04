import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const Results = ({
  setShowResults,
  setShowSelectedResults,
  searchQuery,
}) => {
  const [searchResultLayout, setSearchResultLayout] = useState(false);
  const router = useRouter();

  const handleSelectResult = (i) => {
    console.log(i);
    setShowResults(false);
    setShowSelectedResults(true);
    router.push(`/album/${i}`);
  };

  return (
    <div className="w-[60rem]">
      <div className="flex w-full justify-between">
        <p>Search results for {searchQuery}</p>
        <label className="swap">
          <input
            type="checkbox"
            onClick={() => setSearchResultLayout(!searchResultLayout)}
          />
          <div className="swap-on">GRID</div>
          <div className="swap-off">LIST</div>
        </label>
      </div>
      <div
        className={`grid gap-1 ${
          searchResultLayout ? "grid-cols-1" : "grid-cols-4"
        }`}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div
            onClick={() => handleSelectResult(i)}
            className={`skeleton rounded-md ${
              searchResultLayout ? "h-24 " : " aspect-square h-60"
            }`}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
