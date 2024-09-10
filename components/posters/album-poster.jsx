import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { calculateAlbumLength, getGenres } from "@/utils/spotify";
import { getQrCode } from "@/utils/qrcode";
import useColorPalette from "@/utils/color-palette";

export const AlbumPoster = ({ album }) => {
  const posterRef = useRef(null);
  const [albumLength, setAlbumLength] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [genres, setGenres] = useState(null);
  const [palette, imgRef] = useColorPalette(album.images[0].url);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log("fetched album", album);

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

  useEffect(() => {
    calculateAlbumLength(album.id, setAlbumLength, setLoading);
    getQrCode(album.external_urls.spotify, setQrCode, setLoading);
    getGenres(album?.artists[0].id, setGenres, setLoading);
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-[1000px]">
        <div ref={posterRef} className="flex justify-center w-full md:w-2/3">
          {/* POSTER */}
          <div className="relative w-full max-w-[350px] min-w-[350px] md:min-w-[calc(350px*1.6)] md:max-w-[calc(350px*1.6)] aspect-[2/3] bg-slate-100 border border-base-300 overflow-y-clip ">
            {/* Canvas container with 2:3 aspect ratio */}
            <div className="absolute inset-0 flex flex-col p-[5%]">
              {/* Image Container (top half) */}
              <div className="flex-1 flex justify-center items-center pb-[2%]">
                <div className="w-full h-0 pb-[100%] relative">
                  <img
                    ref={imgRef}
                    src={album ? album.images[0].url : "/vercel.svg"}
                    alt="Album cover"
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* BOTTOM HALF */}
              <div className="flex-1 pb-[1%]">
                <div className="flex flex-row justify-between h-full">
                  <div className="flex-1">
                    <div className="flex w-[8em] md:w-[calc(8em*1.6)] h-[0.6em] md:h-[calc(0.66em*1.6)] mb-[5%]">
                      {palette?.map((color) => (
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
                          }}
                        />
                      ))}
                      {/* <div className="w-full h-full bg-red-200"></div>
                      <div className="w-full h-full bg-red-300"></div>
                      <div className="w-full h-full bg-red-400"></div>
                      <div className="w-full h-full bg-red-500"></div>
                      <div className="w-full h-full bg-red-600"></div> */}
                    </div>
                    <div className="mb-[0.4em] md:mb-[calc(0.4em*1.6)]">
                      <p className="text-[0.8em] md:text-[calc(0.8em*1.6)] font-bold uppercase">
                        {album.artists[0].name}
                      </p>
                      <p className="text-[1em] md:text-[calc(1em*1.6)] font-black uppercase leading-none">
                        {album.name}
                      </p>

                      <p className="text-[0.5em] md:text-[calc(0.5em*1.6)] font-bold uppercase mt-[0.63em]">
                        {genres
                          ?.map((genre) => genre)
                          .slice(0, 2)
                          .join(", ")}
                      </p>
                    </div>
                    <div>
                      {loading || !qrCode ? (
                        <div className="skeleton w-[2.5em] h-[2.5em] md:w-[calc(2.5em*1.6)] md:h-[calc(2.5em*1.6)] rounded-none" />
                      ) : (
                        <img
                          src={qrCode ? qrCode : null}
                          alt="Album QR code"
                          title="Album QR code"
                          className="w-[2.5em] md:w-[calc(2.5em*1.6)]"
                        />
                      )}
                    </div>
                  </div>

                  {/* Remaining Two-Thirds: Tracklist */}
                  <div className="flex-1 flex ">
                    {album.tracks.items.length <= 12 ? (
                      /* One Column for 10 tracks or fewer */
                      <div className="flex flex-col justify-start uppercase font-bold text-[0.5em] md:text-[calc(0.5em*1.6)] w-full">
                        {album.tracks.items.map((track, index) => (
                          // <span
                          //   className=""
                          //   key={index}
                          //   style={{ fontSize: "100%" }}
                          // >
                          //   {index + 1}. {track.name}
                          // </span>
                          <div className="grid grid-cols-6 gap-2" key={index}>
                            <div className="col-span-2 text-right">
                              {index + 1}.
                            </div>
                            <div className="col-span-4">{track.name}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Two Columns for more than 10 tracks */
                      <div className="flex w-full space-x-2 uppercase font-bold text-[0.4em] md:text-[calc(0.4em*1.6)]">
                        <div className="flex-1 flex flex-col justify-start gap-[0.4em] md:gap-[calc(0.4em*1.6)]">
                          {album.tracks.items
                            .slice(0, Math.ceil(album.tracks.items.length / 2))
                            .map((track, index) => (
                              // <span className="" key={index}>
                              //   {index + 1}. {track.name}
                              // </span>
                              <div
                                className="grid grid-cols-6 gap-2"
                                key={index}
                              >
                                <div className="col-span-1 text-right">
                                  {index + 1}.
                                </div>
                                <div className="col-span-5">{track.name}</div>
                              </div>
                            ))}
                        </div>
                        <div className="flex-1 flex flex-col justify-start gap-[0.4em] md:gap-[calc(0.4em*1.6)]">
                          {album.tracks.items
                            .slice(Math.ceil(album.tracks.items.length / 2))
                            .map((track, index) => (
                              // <span
                              //   className=""
                              //   key={
                              //     index +
                              //     Math.ceil(album.tracks.items.length / 2)
                              //   }
                              // >
                              //   {index +
                              //     Math.ceil(album.tracks.items.length / 2) +
                              //     1}
                              //   . {track.name}
                              // </span>
                              <div
                                className="grid grid-cols-6 gap-2"
                                key={
                                  index +
                                  Math.ceil(album.tracks.items.length / 2)
                                }
                              >
                                <div className="col-span-1 text-right">
                                  {index +
                                    Math.ceil(album.tracks.items.length / 2) +
                                    1}
                                  .
                                </div>
                                <div className="col-span-5">{track.name}</div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-row justify-between text-[0.5em] md:text-[calc(0.5em*1.6)] font-bold uppercase">
                  <p>
                    {albumLength} / {album.release_date.slice(0, 4)}{" "}
                  </p>
                  <p>{album.label}</p>
                </div>
              </div>
              {/* BOTTOM HALF */}
            </div>
          </div>
          {/* POSTER */}
        </div>
        {/* <div className="w-full md:w-1/3 ml-0 md:ml-2 flex flex-col items-start justify-start">
          {loading ? (
            <div>
              <p className="skeleton h-8 w-[160px] m-2 rounded-none"></p>
              <div className="flex flex-row md:flex-col">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    className="skeleton aspect-[2/3] w-[160px] h-auto m-2 rounded-none"
                    key={i}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <p className="m-2 text uppercase">select poster style</p>
              <div className="flex flex-row md:flex-col">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    className="skeleton aspect-[2/3] w-[160px] h-auto m-2 rounded-none"
                    key={i}
                  />
                ))}
              </div>
            </>
          )}
        </div> */}
      </div>
      <div>
        <button className="btn btn-primary" onClick={savePoster}>
          Save poster
        </button>
      </div>
    </>
  );
};

export const AlbumPosterLoader = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-[1000px]">
        <div className="relative w-full max-w-[350] min-w-[350] md:max-w-[550px] aspect-[2/3] bg-slate-100 ">
          <div className="absolute inset-0 flex flex-col">
            {/* Image Container (top half) */}
            <div className="flex-1 flex justify-center items-center p-[5%]">
              <div className="w-full h-0 pb-[100%] relative">
                <div className="skeleton absolute inset-0 w-full h-full rounded-none" />
              </div>
            </div>
            {/* BOTTOM HALF */}
            <div className="flex-1 px-[5%] pb-[5%]">
              <div className="flex flex-row justify-between h-full">
                <div className="flex-1">
                  <div className="flex w-[6.3em] md:w-[10em] h-[0.63em] md:h-[1em] mb-[5%]">
                    <div className="skeleton w-full h-full rounded-none" />
                  </div>
                  <div className="mb-[5%]">
                    <p className="skeleton w-40 h-12 rounded-none mb-2"></p>
                    <p className="skeleton w-40 h-8 rounded-none"></p>
                  </div>
                  <div className="skeleton w-40 h-6 rounded-none" />
                </div>
                <div className="flex-1 flex">
                  <div className="flex flex-col justify-between uppercase">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div className="skeleton h-6 w-56 rounded-none" key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-[5%] pb-[5%]">
              <div className="skeleton h-6 w-32 rounded-none" />
            </div>
            {/* BOTTOM HALF */}
          </div>
        </div>
        <div className="w-full md:w-1/3 ml-0 md:ml-2 flex flex-col items-start justify-start">
          <div>
            <p className="skeleton h-8 w-[160px] m-2 rounded-none"></p>
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
      </div>
    </>
  );
};
