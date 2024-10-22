import useColorPalette from "@/utils/color-palette";
import { useContext } from "react";
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

export const AlbumPosterStyleC = ({ album }) => {
  const [palette, imgRef] = useColorPalette(album.images[0].url);
  const { bgColor, textColor, artistTextSize, albumTextSize, tracksTextSize } =
    useContext(EditContext);

  const columns = dynamicChunkArray(album.tracks.items);

  var dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatTime = (timeString) => {
    // Split the timeString by colon
    if (!timeString) return "Invalid time format";
    const timeParts = timeString.split(":");

    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // If it's in HH:MM:SS format
    if (timeParts.length === 3) {
      hours = parseInt(timeParts[0], 10);
      minutes = parseInt(timeParts[1], 10);
      seconds = parseInt(timeParts[2], 10);
    }
    // If it's in MM:SS format
    else if (timeParts.length === 2) {
      minutes = parseInt(timeParts[0], 10);
      seconds = parseInt(timeParts[1], 10);
    }

    // Build the result string
    const result = [
      hours > 0 ? `${hours} hr` : null,
      minutes > 0 ? `${minutes} min` : null,
      seconds > 0 ? `${seconds} sec` : null,
    ]
      .filter(Boolean) // Remove nulls
      .join(" "); // Join parts with space

    return result;
  };

  return (
    <div>
      {/* POSTER START*/}
      <div className="relative w-full max-w-[350px] min-w-[350px] md:min-w-[calc(350px*1.6)] md:max-w-[calc(350px*1.6)] aspect-[2/3] text-slate-900 bg-slate-100 border border-base-300 overflow-y-clip ">
        {/* Canvas container with 2:3 aspect ratio */}
        <div
          className="absolute inset-0 flex flex-col items-evenly justify-evenly p-[7%]"
          style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
        >
          {/* ARTIST, TITLE, ART */}
          <div>
            <div className="flex justify-between items-start pb-[1%]">
              <p
                // className="text-[0.8em] md:text-[calc(0.8em*1.6)] font-bold uppercase min-w-[25%]"
                className="artist-text min-w-[25%]"
                style={{ "--artist-text-size": `${artistTextSize}em` }}
              >
                {album.artists[0].name}
              </p>
              <p
                // className="text-[1em] md:text-[calc(1em*1.6)] font-black uppercase leading-none text-end"
                className="album-text leading-none text-end"
                style={{ "--album-text-size": `${albumTextSize}em` }}
              >
                {album.name}
              </p>
            </div>
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
          </div>

          {/* TRACKLIST */}
          <div className="flex-1">
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
          </div>

          {/* DETAILS */}
          <div className="flex w-full items-end justify-between gap-2 border-t-2 border-slate-900 pt-[2%]">
            <div className="flex flex-col">
              <div className="flex flex-col items-start justify-start text-[0.5em] md:text-[calc(0.5em*1.6)] font-bold h-full pb-[2%]">
                <p className="flex gap-[0.4em] text-[0.6em] md:text-[calc(0.6em*1.6)] capitalize">
                  <span>
                    {new Date(album.release_date).toLocaleDateString(
                      "en-US",
                      dateOptions
                    )}
                  </span>
                  •
                  <span className="lowercase">
                    {formatTime(album.album_length)}
                  </span>
                </p>
                <p className="text-[0.6em] md:text-[calc(0.6em*1.6)]">
                  Released by <span>{album.label}</span>
                </p>
              </div>
              <div className="flex gap-[0.2em]">
                {palette?.map((color) => (
                  <div
                    className="w-[1em] md:w-[calc(1em*1.6)] h-[1em] md:h-[calc(1em*1.6)] rounded-full"
                    key={color}
                    style={{
                      backgroundColor: `rgb(${color[0]},${color[1]},${color[2]})`,
                    }}
                  />
                ))}
              </div>
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
      {/* POSTER END*/}
    </div>
  );
};
