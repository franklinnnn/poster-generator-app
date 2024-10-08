import useColorPalette from "@/utils/color-palette";
import { AlbumSelectStyle } from "../select-style";

export const AlbumPosterStyleA = ({ album, posterRef }) => {
  const [palette, imgRef] = useColorPalette(album?.images[0]?.url);

  return (
    <div>
      {/* POSTER START*/}
      <div className="relative w-full max-w-[350px] min-w-[350px] md:min-w-[calc(350px*1.6)] md:max-w-[calc(350px*1.6)] aspect-[2/3] bg-slate-100 text-slate-900 border border-base-300 overflow-y-clip ">
        {/* Canvas container with 2:3 aspect ratio */}
        <div className="absolute inset-0 flex flex-col p-[5%]">
          {/* ALBUM IMAGE CONTAINER */}
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

          {/* ALBUM DETAILS CONTAINER */}
          <div className="flex-1 pb-[1%]">
            <div className="flex flex-row justify-between h-full">
              <div className="flex-1">
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
                <div className="mb-[0.4em] md:mb-[calc(0.4em*1.6)]">
                  <p className="text-[0.8em] md:text-[calc(0.8em*1.6)] font-bold uppercase">
                    {album.artists[0].name}
                  </p>
                  <p className="text-[1em] md:text-[calc(1em*1.6)] font-black uppercase leading-none">
                    {album.name}
                  </p>

                  <p className="text-[0.5em] md:text-[calc(0.5em*1.6)] font-bold uppercase mt-[0.63em]">
                    {album.genres
                      ?.map((genre) => genre)
                      .slice(0, 2)
                      .join(", ")}
                  </p>
                </div>
                <div>
                  <img
                    src={album.qr_code_url ? album.qr_code_url : null}
                    alt="Album QR code"
                    title="Album QR code"
                    className="w-[2.5em] md:w-[calc(2.5em*1.6)]"
                  />
                </div>
              </div>

              {/* ALBUM TRACKLIST */}
              <div className="flex-1 flex ">
                {album.tracks.items.length <= 12 ? (
                  /* One Column for 10 tracks or fewer */
                  <div className="flex flex-col justify-start uppercase font-bold text-[0.5em] md:text-[calc(0.5em*1.6)] w-full">
                    {album.tracks.items.map((track, index) => (
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
                    <div className="flex-1 flex flex-col justify-start gap-[0.2em] md:gap-[calc(0.2em*1.6)]">
                      {album.tracks.items
                        .slice(0, Math.ceil(album.tracks.items.length / 2))
                        .map((track, index) => (
                          <div className="grid grid-cols-6 gap-2" key={index}>
                            <div className="col-span-1 text-right">
                              {index + 1}.
                            </div>
                            <div className="col-span-5">{track.name}</div>
                          </div>
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col justify-start gap-[0.2em] md:gap-[calc(0.2em*1.6)]">
                      {album.tracks.items
                        .slice(Math.ceil(album.tracks.items.length / 2))
                        .map((track, index) => (
                          <div
                            className="grid grid-cols-6 gap-2"
                            key={
                              index + Math.ceil(album.tracks.items.length / 2)
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
              {/* ALBUM TRACKLIST */}
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-between text-[0.5em] md:text-[calc(0.5em*1.6)] font-bold uppercase">
              <p>
                {album.album_length} / {album.release_date.slice(0, 4)}{" "}
              </p>
              <p>{album.label}</p>
            </div>
          </div>
          {/* ALBUM DETAILS */}
        </div>
      </div>
      {/* POSTER END*/}
    </div>
  );
};