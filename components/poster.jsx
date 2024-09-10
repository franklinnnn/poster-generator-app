import { useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { testAlbum } from "@/utils/testAlbum";

export const Poster = ({ album }) => {
  const posterRef = useRef(null);

  console.log("fetched album", album);

  const savePoster = () => {
    console.log("save poster");
    toPng(posterRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-poster.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full">
        <div ref={posterRef} className="flex justify-center w-full md:w-2/3">
          {/* POSTER */}
          <div className="bg-slate-100 text-slate-900 aspect-[2/3] w-fit lg:w-[550px] lg:h-[825px] shadow-xl p-6">
            <figure className="flex justify-center aspect-square">
              <img
                src={album ? album.images[0].url : "/vercel.svg"}
                alt="Album cover"
              />
            </figure>
            <div className="flex mt-6">
              <div className="flex flex-col w-2/3 text-[8.5px] font-bold">
                {album.tracks.items.map((track, index) => (
                  <span className="uppercase" key={index}>
                    {index + 1} {track.name}
                  </span>
                ))}
              </div>
              <div className="w-1/3">
                <div className="flex justify-between w-full max-w-xs mx-auto">
                  <div className="flex-1 h-4 bg-red-200"></div>
                  <div className="flex-1 h-4 bg-red-300"></div>
                  <div className="flex-1 h-4 bg-red-400"></div>
                  <div className="flex-1 h-4 bg-red-500"></div>
                  <div className="flex-1 h-4 bg-red-600"></div>
                </div>
                <div className="flex flex-col items-end pr-2 uppercase whitespace-nowrap">
                  <p className="text-xl">{album.artists[0].name}</p>
                  <p className="text-2xl font-bold">{album.name}</p>
                  <p>50:00 / {album.release_date.slice(0, 4)}</p>
                  <p className="text-[10px]">{album.label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 ml-0 md:ml-2">
          <p className="text-left uppercase">select poster style</p>
          <div className="flex flex-row md:flex-col">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                className="skeleton aspect-[2/3] w-[160px] h-auto m-2 rounded-none"
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <button className="btn btn-primary" onClick={savePoster}>
          Save poster
        </button>
      </div>
    </>
  );
};
