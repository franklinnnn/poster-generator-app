import React from "react";

export const ResultsLoader = () => {
  return (
    <div>
      <div className="flex w-full justify-between mb-2">
        <div className="skeleton h-5 w-12" />
        <div className="skeleton h-5 w-8" />
      </div>
      <div
        className=" grid gap-2
            grid-cols-3"
      >
        {Array.from({ length: 8 }, (_, i) => (
          <div
            onClick={() => handleSelectResult(i)}
            className="skeleton rounded-md aspect-square w-full"
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
