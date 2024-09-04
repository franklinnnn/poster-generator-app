import { useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { testAlbum } from "@/utils/testAlbum";
import { useExtractColor } from "react-extract-colors";

export const Poster = () => {
  const posterRef = useRef(null);

  const image = testAlbum.images[0].url;
  console.log(image);

  const { colors, dominantColor, darkerColor, lighterColor, loading, error } =
    useExtractColor(image, {
      maxColors: 5,
      format: "hex",
      maxSize: 200,
    });

  console.log(colors, dominantColor, darkerColor, lighterColor);

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
                src={testAlbum ? testAlbum.images[0].url : "/vercel.svg"}
                alt="Album cover"
              />
            </figure>
            <div className="flex mt-6">
              <div className="flex flex-col w-2/3 text-[8.5px] font-bold">
                {testAlbum.tracks.items.map((track, index) => (
                  <span className="uppercase" key={index}>
                    {index + 1} {track.name}
                  </span>
                ))}
              </div>
              <div className="w-1/3">
                <div className="flex justify-between w-full max-w-xs mx-auto">
                  <div
                    className="flex-1 h-4"
                    style={{ background: colors[0] }}
                  ></div>
                  <div
                    className="flex-1 h-4"
                    style={{ background: dominantColor }}
                  ></div>
                  <div
                    className="flex-1 h-4"
                    style={{ background: darkerColor }}
                  ></div>
                  <div
                    className="flex-1 h-4"
                    style={{ background: lighterColor }}
                  ></div>
                  <div
                    className="flex-1 h-4"
                    style={{ background: colors[4] }}
                  ></div>
                </div>
                <div className="flex flex-col items-end pr-2 uppercase whitespace-nowrap">
                  <p className="text-xl">{testAlbum.artists[0].name}</p>
                  <p className="text-2xl font-bold">{testAlbum.name}</p>
                  <p>50:00 / {testAlbum.release_date.slice(0, 4)}</p>
                  <p className="text-[10px]">{testAlbum.label}</p>
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
