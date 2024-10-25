import { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { EditContext } from "./edit-context";

export const EditOptions = () => {
  const {
    bgColor,
    setBgColor,
    textColor,
    setTextColor,
    artistTextSize,
    setArtistTextSize,
    albumTextSize,
    setAlbumTextSize,
    tracksTextSize,
    setTracksTextSize,
  } = useContext(EditContext);

  console.log(bgColor, textColor);

  return (
    <div className="flex flex-col gap-4 items-center md:items-start md:justify-start md:w-1/3 pl-0 md:pl-2 mt-6 md:mt-0 font-bold uppercase ">
      <div className="flex md:flex-col gap-4">
        <div className="color-picker">
          <h2 className="mb-2">background color</h2>
          <HexColorPicker color={bgColor} onChange={setBgColor} />
        </div>
        <div className="color-picker">
          <h2 className="mb-2">text color</h2>
          <HexColorPicker color={textColor} onChange={setTextColor} />
        </div>
      </div>

      <div className="text-sm capitalize w-full md:w-60">
        <h2 className="text-base uppercase">text size</h2>
        <label htmlFor="">artist</label>
        <input
          type="range"
          min={0}
          max="1.6"
          value={artistTextSize}
          step="0.01"
          onChange={(e) => setArtistTextSize(e.target.value)}
          className="range range-xs"
        />
        <label htmlFor="">album</label>
        <input
          type="range"
          min={0}
          max="2"
          value={albumTextSize}
          step="0.01"
          onChange={(e) => setAlbumTextSize(e.target.value)}
          className="range range-xs"
        />
        <label htmlFor="">tracks</label>
        <input
          type="range"
          min={0}
          max="1"
          value={tracksTextSize}
          step="0.01"
          onChange={(e) => setTracksTextSize(e.target.value)}
          className="range range-xs"
        />
      </div>

      {/* <div
        className="uppercase"
        style={{ backgroundColor: `${bgColor}`, color: `${textColor}` }}
      >
        <p style={{ fontSize: `${artistTextSize}em` }}>artist name</p>
        <p style={{ fontSize: `${albumTextSize}em` }}>album title</p>
        <div>
          {Array.from({ length: 8 }, (_, i) => (
            <p style={{ fontSize: `${tracksTextSize}em` }} key={i}>
              <span className="mr-2">{i + 1}</span>
              <span>track name</span>
            </p>
          ))}
        </div>
      </div> */}
    </div>
  );
};
