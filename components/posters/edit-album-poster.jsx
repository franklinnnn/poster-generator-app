import useColorPalette from "@/utils/color-palette";
import { getQrCode } from "@/utils/qrcode";
import { calculateAlbumLength, getGenres } from "@/utils/spotify";
import React, { useEffect, useState } from "react";

export const EditAlbumPoster = ({ edit, setEdit }) => {
  const [albumLength, setAlbumLength] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [genres, setGenres] = useState(null);
  const [palette, imgRef] = useColorPalette(edit.images[0].url);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState(null);
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState(null);
  const [swatches, setSwatches] = useState(null);

  useEffect(() => {
    calculateAlbumLength(edit.id, setAlbumLength, setLoading);
    getQrCode(edit.external_urls.spotify, setQrCode, setLoading);
  }, []);

  const handleArtistChange = (newArtist) => {
    setEdit((prev) => ({
      ...prev,
      artists: prev.artists.map((artist, index) =>
        index === 0 ? { ...artist, name: newArtist } : artist
      ),
    }));
  };
  const handleTitleChange = (newTitle) => {
    setEdit((prev) => ({
      ...prev,
      name: newTitle,
    }));
  };
  const handleGenreChange = (newGenre, index) => {
    const updatedGenres = edit.genres.map((genre, i) =>
      i === index ? newGenre : genre
    );
    setEdit((prev) => ({
      ...prev,
      genres: updatedGenres,
    }));
  };

  const handleTrackChange = (newTrack, index) => {
    const updatedTracks = edit.tracks.items.map((track, i) =>
      i === index ? { ...edit.tracks.items, name: newTrack } : track
    );

    setEdit((prev) => ({
      ...prev,
      tracks: {
        ...prev.tracks,
        items: updatedTracks,
      },
    }));
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1000px]">
      <div className="flex justify-center w-full ">
        {/* POSTER START*/}
        <div className="relative w-full max-w-[350px] min-w-[350px] md:min-w-[calc(350px*1.6)] md:max-w-[calc(350px*1.6)] aspect-[2/3] bg-slate-100 text-slate-900 border border-base-300 overflow-y-clip ">
          {/* Canvas container with 2:3 aspect ratio */}

          <div className="absolute left-0 top-0 px-4 py-2 bg-primary/70 uppercase font-bold z-20">
            editing poster
          </div>
          <div className="absolute inset-0 flex flex-col p-[5%]">
            {/* Image Container (top half) */}
            <div className="flex-1 flex justify-center items-center pb-[2%]">
              <div className="w-full h-0 pb-[100%] relative">
                <img
                  ref={imgRef}
                  src={edit ? edit.images[0].url : "/vercel.svg"}
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
                  </div>
                  <div className="mb-[0.4em] md:mb-[calc(0.4em*1.6)]">
                    <input
                      type="text"
                      name="artist"
                      value={edit.artists[0].name}
                      onChange={(e) => handleArtistChange(e.target.value)}
                      className="text-[0.8em] md:text-[calc(0.8em*1.6)] font-bold uppercase max-w-[6em] md:max-w-[calc(6em*1.6)] mb-[0.2em] md:mb[calc(0.2em*0.6)] bg-slate-200"
                    />

                    <input
                      type="text"
                      name="title"
                      value={edit.name}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="text-[1em] md:text-[calc(1em*1.6)] font-black uppercase leading-none max-w-[6em] md:max-w-[calc(6em*1.6)] bg-slate-200"
                    />

                    <div className="my-0">
                      {edit &&
                        edit.genres
                          ?.map((genre, index) => (
                            <input
                              type="text"
                              key={index}
                              value={genre}
                              onChange={(e) =>
                                handleGenreChange(e.target.value, index)
                              }
                              className="text-[0.5em] md:text-[calc(0.5em*1.6)] font-bold uppercase  max-w-[4em] md:max-w-[calc(4em*1.6)] mr-[0.4em] md:mr[calc(0.4em*0.6)] bg-slate-200"
                            />
                          ))
                          .slice(0, 2)}
                    </div>
                  </div>
                  <div>
                    <img
                      src={qrCode ? qrCode : null}
                      alt="Album QR code"
                      title="Album QR code"
                      className="w-[2.5em] md:w-[calc(2.5em*1.6)]"
                    />
                  </div>
                </div>

                {/* Remaining Two-Thirds: Tracklist */}
                <div className="flex-1 flex ">
                  {edit.tracks.items.length <= 12 ? (
                    /* One Column for 10 tracks or fewer */
                    <div className="flex flex-col justify-start uppercase font-bold text-[0.47em] md:text-[calc(0.47em*1.6)] w-full">
                      {edit.tracks.items.map((track, index) => (
                        <div
                          className="grid grid-cols-6 gap-2 mb-[0.1em] md:mb[calc(0.1em*0.6 )]"
                          key={index}
                        >
                          <div className="col-span-2 text-right">
                            {index + 1}.
                          </div>
                          {/* <div className="col-span-4">{track.name}</div> */}
                          <input
                            type="text"
                            value={track.name}
                            onChange={(e) =>
                              handleTrackChange(e.target.value, index)
                            }
                            className="col-span-4 uppercase bg-slate-200"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Two Columns for more than 10 tracks */
                    <div className="flex w-full space-x-2 uppercase font-bold text-[0.45em] md:text-[calc(0.45em*1.6)]">
                      <div className="flex-1 flex flex-col justify-start gap-[0.2em] md:gap-[calc(0.2em*1.6)]">
                        {edit.tracks.items
                          .slice(0, Math.ceil(edit.tracks.items.length / 2))
                          .map((track, index) => (
                            <div className="grid grid-cols-6 gap-2" key={index}>
                              <div className="col-span-1 text-right">
                                {index + 1}.
                              </div>
                              {/* <div className="col-span-5">{track.name}</div> */}
                              <input
                                type="text"
                                value={track.name}
                                onChange={(e) =>
                                  handleTrackChange(index, e.target.value)
                                }
                                className="col-span-4 uppercase bg-inherit"
                              />
                            </div>
                          ))}
                      </div>
                      <div className="flex-1 flex flex-col justify-start gap-[0.2em] md:gap-[calc(0.2em*1.6)]">
                        {edit.tracks.items
                          .slice(Math.ceil(edit.tracks.items.length / 2))
                          .map((track, index) => (
                            <div
                              className="grid grid-cols-6 gap-2"
                              key={
                                index + Math.ceil(edit.tracks.items.length / 2)
                              }
                            >
                              <div className="col-span-1 text-right">
                                {index +
                                  Math.ceil(edit.tracks.items.length / 2) +
                                  1}
                                .
                              </div>
                              {/* <div className="col-span-5">{track.name}</div> */}
                              <input
                                type="text"
                                value={track.name}
                                onChange={(e) =>
                                  handleTrackChange(index, e.target.value)
                                }
                                className="col-span-4 uppercase bg-inherit"
                              />
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
                  {albumLength} / {edit.release_date.slice(0, 4)}{" "}
                </p>
                {/* <div>
                  <input
                    type="text"
                    value={length}
                    className="max-w-[4em] md:max-w-[calc(4em*0.6)]"
                  />{" "}
                  /{" "}
                  <input
                    type="text"
                    value={releaseDate}
                    className="max-w-[4em] md:max-w-[calc(4em*0.6)]"
                  />
                </div> */}
                <p>{edit.label}</p>
                {/* <input type="text" value={label} /> */}
              </div>
            </div>
            {/* BOTTOM HALF */}
          </div>
        </div>
        {/* POSTER END*/}
      </div>
    </div>
  );
};
