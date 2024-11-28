"use client";

import useColorPalette from "@/utils/color-palette";
import { getConfig } from "@/utils/tmdb";
import { useEffect } from "react";

export const MoviePosterStyleA = ({ movie, posterRef }) => {
  const posterUrl = `http://image.tmdb.org/t/p/original${movie?.poster_path}`;
  const backdrop = `http://image.tmdb.org/t/p/original${movie?.backdrop_path}`;
  const [palette, imgRef] = useColorPalette(backdrop);

  console.log(movie);

  // console.log("palette", palette);
  if (!movie || !movie.cast || !movie.director) {
    <div>loading...</div>;
  }
  return (
    <div className="relative w-full max-w-[350px] min-w-[350px] md:min-w-[calc(350px*1.6)] md:max-w-[calc(350px*1.6)] aspect-[2/3] bg-slate-100 text-slate-900 overflow-y-clip shadow-md">
      <div
        ref={posterRef}
        className="absolute inset-0 flex flex-col justify-evenly p-[5%]"
      >
        {/* image */}
        <div className="flex-1 flex justify-start items-start pb-[2%]">
          <div className="w-full h-0 pb-[100%] relative">
            <img
              ref={imgRef}
              src={backdrop}
              alt="Movie poster"
              crossOrigin="anonymous"
              className="absolute inset-0 w-full object-cover"
            />
          </div>
        </div>
        {/* title */}
        <div className="flex-col justify-center items-center w-full uppercase mb-6">
          <h1 className="text-4xl text-center">{movie?.title}</h1>
        </div>
        {/* cast */}
        <div className="flex-col text-center uppercase bold mb-6">
          <p className="text-xs">directed by</p>
          <p className="mb-2">
            {!movie?.director[0]?.name ? null : movie?.director[0]?.name}
          </p>
          <p className="text-xs">starring</p>
          <p className="flex justify-center gap-2">
            {movie?.cast?.map((cast) => (
              <div className="text-[1em]">{cast.name}</div>
            ))}
          </p>
        </div>
        <div className="flex w-[8em] md:w-[calc(8em*1.6)] h-[0.6em] md:h-[calc(0.66em*1.6)] mb-[5%]">
          {palette?.map((color) => (
            <div
              className="w-full h-full"
              key={color}
              style={{
                backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
              }}
            />
          ))}
        </div>

        <div>
          <p>{movie?.release_date}</p>
        </div>
      </div>
    </div>
  );
};
