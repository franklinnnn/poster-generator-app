import useColorPalette from "@/utils/color-palette";
import React, { useContext } from "react";
import { EditContext } from "../edit-context";

const dynamicChunkArray = (array) => {
  const totalTracks = array.length;

  const numColumns = Math.ceil(totalTracks / 6);

  let baseChunkSize = Math.floor(totalTracks / numColumns);

  const remainder = totalTracks % numColumns;

  const columns = [];
  let startIndex = 0;

  for (let i = 0; i < numColumns; i++) {
    const chunkSize = baseChunkSize + (i < remainder ? 1 : 0);
    columns.push(array.slice(startIndex, startIndex + chunkSize));
    startIndex += chunkSize;
  }

  return columns;
};

export const AlbumPosterStyleB = ({ album, posterRef }) => {
  const [palette, imgRef] = useColorPalette(album.images[0].url);
  const {
    bgColor,
    textColor,
    artistTextSize,
    albumTextSize,
    tracksTextSize,
    style,
  } = useContext(EditContext);

  const columns = dynamicChunkArray(album.tracks.items);

  return (
    <div
      ref={posterRef}
      className="absolute inset-0 flex flex-col justify-evenly p-[5%]"
      style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
    >
      {/* DETAILS */}
      <div className="flex-1">
        <div className="flex">
          <div>
            <p
              // className="text-[0.8em] md:text-[calc(0.8em*1.6)] font-bold uppercase"
              className="artist-text"
              style={{ "--artist-text-size": `${artistTextSize}em` }}
            >
              {album.artists[0].name}
            </p>
            <p
              // className="text-[1em] md:text-[calc(1em*1.6)] font-black uppercase leading-none"
              className="album-text leading-none"
              style={{ "--album-text-size": `${albumTextSize}em` }}
            >
              {album.name}
            </p>
            <div className="mb-[0.4em] md:mb-[calc(0.4em*1.6)]">
              <p className="text-[0.4em] md:text-[calc(0.4em*1.6)] font-bold uppercase mt-[0.3em]">
                {album.genres
                  ?.map((genre) => genre)
                  .slice(0, 2)
                  .join(", ")}
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-1 items-end w-full">
            <div className="flex w-full items-end justify-end gap-2 ">
              <div className="flex flex-col items-end justify-between text-[0.5em] md:text-[calc(0.5em*1.6)] font-bold uppercase h-full">
                <p>{album.album_length}</p>
                <p>{album.release_date.slice(0, 4)}</p>
                <p className="text-[0.45em] md:text-[calc(0.45em*1.6)]">
                  {album.label}
                </p>
              </div>
              <img
                src={album.qr_code_url ? album.qr_code_url : null}
                alt="Album QR code"
                title="Album QR code"
                className="w-[2.5em] md:w-[calc(2.5em*1.6)]"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full h-[0.3em] md:h-[calc(0.36em*1.6)] mb-[2%]">
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
      </div>

      {/* TRACKLIST */}
      <div className="flex flex-row justify-between h-full">
        <div className="flex-1 flex space-x-2">
          {/* Map through the columns and render each one */}
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              // className="flex-1 flex flex-col gap-[0.2em] uppercase font-bold text-[0.5em] md:text-[calc(0.5em*1.6)]"
              className="tracks-text flex-1 flex flex-col gap-[0.2em]"
              style={{ "--tracks-text-size": `${tracksTextSize}em` }}
            >
              {column.map((track, trackIndex) => (
                <div className="grid grid-cols-6 gap-2" key={trackIndex}>
                  <div className="col-span-1 text-right">
                    {/* Calculate the correct track number */}
                    {colIndex * column.length + trackIndex + 1}.
                  </div>
                  <div className="col-span-5">{track.name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ART */}
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

      {/* ACCENT BAR */}
      <div>
        {palette
          .map((color) => (
            <div
              className="w-1/4 h-[0.3em] md:h-[calc(0.36em*1.6)] mt-[2%]"
              key={color}
              style={{
                backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
              }}
            />
          ))
          .slice(2, 3)}
      </div>
    </div>
  );
};
