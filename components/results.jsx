import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ResultContext } from "./results-context";
import { ResultsCard } from "./results-card";

export const Results = () => {
  const { results, showResults, setShowResults } = useContext(ResultContext);
  const [layout, setLayout] = useState(false);
  const router = useRouter();

  console.log(results);

  return (
    <>
      {showResults && (
        <div className="w-[60rem]">
          <div className="flex w-full justify-between">
            <div>
              Search results for{" "}
              <span className="capitalize">{results.query}</span>
            </div>
            <label className="swap">
              <input type="checkbox" onClick={() => setLayout(!layout)} />
              <div className="swap-on">GRID</div>
              <div className="swap-off">LIST</div>
            </label>
          </div>
          <div
            className={`grid gap-1 ${layout ? "grid-cols-1" : "grid-cols-4"}`}
          >
            {/* {Array.from({ length: 8 }, (_, i) => (
              <div
                onClick={() => handleSelectResult(i)}
                className={`skeleton rounded-md ${
                  searchResultLayout ? "h-24 " : " aspect-square h-60"
                }`}
                key={i}
              />
            ))} */}

            {results?.items?.map((item) => (
              <ResultsCard item={item} key={item.id} layout={layout} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
