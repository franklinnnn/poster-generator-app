"use client";

import { useState } from "react";
import { CiBoxList, CiGrid41 } from "react-icons/ci";

import { ResultsLoader } from "./results-loader";
import { AlbumResults } from "./album-results";
import { MovieResults } from "./movie-results";

export const Results = ({ results, type, loading }) => {
  const [layout, setLayout] = useState(false);

  return (
    <div className="my-6 w-full md:w-[800px]">
      {loading ? (
        <ResultsLoader />
      ) : (
        <>
          <div className="flex w-full justify-between mb-2">
            <div>
              Search results for{" "}
              <span className="capitalize font-bold">{results.query}</span>
            </div>
            <label className="swap">
              <input type="checkbox" onClick={() => setLayout(!layout)} />
              <div className="swap-on">
                <CiGrid41 size={30} />
              </div>
              <div className="swap-off">
                <CiBoxList size={30} />
              </div>
            </label>
          </div>
          {type === "album" && (
            <div
              className={`grid justify-center gap-2 ${
                layout ? "grid-cols-1" : "md:grid-cols-3"
              }`}
            >
              {results?.items?.map((item) => (
                <AlbumResults item={item} key={item.id} layout={layout} />
              ))}
            </div>
          )}

          {type === "movie" && (
            <div
              className={`grid justify-center gap-2 ${
                layout ? "grid-cols-1" : "md:grid-cols-3"
              }`}
            >
              {results?.items?.map((item) => (
                <MovieResults item={item} key={item.id} layout={layout} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
