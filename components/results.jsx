"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ResultsCard } from "./results-card";
import { ResultsLoader } from "./results-loader";
import { CiBoxList, CiGrid41 } from "react-icons/ci";

export const Results = ({ results, loading }) => {
  const [layout, setLayout] = useState(false);
  const router = useRouter();

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
          <div
            className={`grid justify-center gap-2 ${
              layout ? "grid-cols-1" : "md:grid-cols-3"
            }`}
          >
            {results?.items?.map((item) => (
              <ResultsCard item={item} key={item.id} layout={layout} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
