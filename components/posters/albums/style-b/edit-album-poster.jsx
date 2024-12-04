import useColorPalette from "@/utils/color-palette";
import { useContext, useState } from "react";
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

export const EditAlbumPosterStyleB = ({ edit, setEdit }) => {
  const [palette, imgRef] = useColorPalette(edit.images[0].url);
  const [showGenreInput, setShowGenreInput] = useState(false);
  const [newGenre, setNewGenre] = useState("");
  const [theme, setTheme] = useState("light");
  const { bgColor, textColor, artistTextSize, albumTextSize, tracksTextSize } =
    useContext(EditContext);

  const [loading, setLoading] = useState(true);

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
  const handleAddGenre = () => {
    const newGenres = [...edit.genres, ""];
    setEdit((prev) => ({ ...prev, genres: newGenres }));
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

  const columns = dynamicChunkArray(edit.tracks.items);

  return (
    <div>
      <div className="absolute left-0 top-0 px-4 w-full bg-secondary/70 uppercase font-bold z-20">
        editing poster
      </div>
      {/* Canvas container with 2:3 aspect ratio */}
      <div
        className="absolute inset-0 flex flex-col justify-evenly p-[5%]"
        style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
      >
        {/* DETAILS */}
        <div className="flex-1">
          <div className="flex">
            <div className="w-1/2">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="artist"
                  value={edit.artists[0].name}
                  onChange={(e) => handleArtistChange(e.target.value)}
                  // className="text-[0.8em] md:text-[calc(0.8em*1.6)] font-bold uppercase max-w-full mb-[0.1em] md:mb[calc(0.1em*0.6)] bg-slate-200"

                  className="artist-text max-w-full mb-[0.1em] md:mb-[calc(0.1em*0.6)] bg-slate-200/40"
                  style={{ "--artist-text-size": `${artistTextSize}em` }}
                />
                <input
                  type="text"
                  name="title"
                  value={edit.name}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  // className="text-[1em] md:text-[calc(1em*1.6)] font-black uppercase leading-none max-full mb-[0.1em] md:mb[calc(0.1em*0.6)] bg-slate-200"

                  className="album-text max-w-full mb-[0.1em] md:mb-[calc(0.1em*0.6)] bg-slate-200/40"
                  style={{ "--album-text-size": `${albumTextSize}em` }}
                />
              </div>
              <div className="flex gap-[0.2em]">
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
                        className="text-[0.5em] md:text-[calc(0.5em*1.6)] font-bold uppercase  max-w-[4em] md:max-w-[calc(4em*1.6)] mr-[0.4em] md:mr[calc(0.4em*0.6)] bg-slate-200/40"
                      />
                    ))
                    .slice(0, 2)}
                {edit.genres.length === 1 && !showGenreInput && (
                  <button onClick={() => setShowGenreInput(true)}>+</button>
                )}

                {showGenreInput && (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter new genre"
                      value={newGenre}
                      onChange={(e) => setNewGenre(e.target.value)}
                      className="text-[0.5em] md:text-[calc(0.5em*1.6)] font-bold uppercase  max-w-[4em] md:max-w-[calc(4em*1.6)] mr-[0.4em] md:mr[calc(0.4em*0.6)] bg-slate-200/40"
                    />
                    <button onClick={handleAddGenre}>ok</button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col flex-1 items-end w-full">
              <div className="flex w-full items-end justify-end gap-2 ">
                <div className="flex flex-col items-end justify-between text-[0.5em] md:text-[calc(0.5em*1.6)] font-bold uppercase h-full">
                  <p>{edit.album_length}</p>
                  <p>{edit.release_date.slice(0, 4)}</p>
                  <p className="text-[0.45em] md:text-[calc(0.45em*1.6)]">
                    {edit.label}
                  </p>
                </div>
                <img
                  src={edit.qr_code_url ? edit.qr_code_url : null}
                  alt="Album QR code"
                  title="Album QR code"
                  className="w-[2.5em] md:w-[calc(2.5em*1.6)]"
                />
              </div>
            </div>
          </div>

          <div className="flex w-full h-[0.3em] md:h-[calc(0.36em*1.6)] my-[2%]">
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
                className="tracks-text flex-1 flex-col gap-[0.2em]"
                style={{
                  "--tracks-text-size": `${tracksTextSize}em`,
                }}
              >
                {column.map((track, trackIndex) => (
                  <div className="grid grid-cols-6 gap-2" key={trackIndex}>
                    <div className="col-span-1 text-right">
                      {/* Calculate the correct track number */}
                      {colIndex * column.length + trackIndex + 1}.
                    </div>
                    <input
                      type="text"
                      value={track.name}
                      onChange={(e) =>
                        handleTrackChange(e.target.value, trackIndex)
                      }
                      className="col-span-4 uppercase bg-slate-200/40"
                    />
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
              src={edit ? edit.images[0].url : "/vercel.svg"}
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
    </div>
  );
};
