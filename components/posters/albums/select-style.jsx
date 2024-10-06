import React from "react";

export const AlbumSelectStyle = () => {
  return (
    <div className="w-full md:w-1/3 pl-0 md:pl-2 flex flex-col items-center md:items-start md:justify-start">
      <p className="m-2 text uppercase">select poster style</p>
      <div className="flex flex-row md:flex-col">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            className="skeleton aspect-[2/3] w-24 md:w-40 h-auto m-2 rounded-none"
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
