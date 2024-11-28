import { useRouter } from "next/navigation";
import React from "react";

export const MovieResults = ({ item, layout }) => {
  const router = useRouter();
  const posterUrl = `http://image.tmdb.org/t/p/w500${item?.poster_path}`;

  const handleSelectResult = () => {
    router.push(`/movie/${item.id}`);
  };

  if (!item || !item.poster_path || !item.original_title) {
    return <div className="skeleton rounded-sm aspect-[2/3] w-full" />;
  }

  return (
    <div onClick={handleSelectResult} className="hover:cursor-pointer">
      {layout ? (
        <div className="relative rounded-none h-24 overflow-hidden group border-2">
          <div className="flex gap-4 absolute top-0 left-0 w-full font-bold z-10">
            <img src={posterUrl} alt="Album cover" className="h-24" />
            <div className="p-2 group-hover:pr-6 transition-all">
              <p className="text-2xl truncate ...">{item?.title}</p>
              <p>{item.release_date.slice(0, 4)}</p>
            </div>
          </div>
          <img
            src={posterUrl}
            alt="Album cover"
            className="w-3/4 blur-3xl group-hover:w-full opacity-60 transition-all"
          />
        </div>
      ) : (
        <div className="relative rounded-sm aspect-[2/3] w-full overflow-hidden group">
          <div className="absolute bottom-0 left-0 p-2 w-full bg-base-200 opacity-90 hidden font-bold group-hover:block z-10 transition">
            <p className="text-2xl">{item.title}</p>
          </div>
          <img src={posterUrl} alt="Movie poster" />
        </div>
      )}
    </div>
  );
};
