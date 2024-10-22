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
  // const [bgColor, setBgColor] = useState("");
  // const [textColor, setTextColor] = useState("");
  // const [artistTextSize, setArtistTextSize] = useState(0.8);
  // const [albumTextSize, setAlbumTextSize] = useState(1);
  // const [tracksTextSize, setTracksTextSize] = useState(0.2);

  console.log("colors", bgColor, textColor);
  console.log("text sizes", artistTextSize, albumTextSize, tracksTextSize);
  return (
    <div className="md:w-1/3 pl-0 md:pl-2 flex flex-col gap-4 items-center md:items-start md:justify-start font-bold uppercase">
      <div className="flex md:flex-col gap-2">
        <div>
          <h2 htmlFor="">background color</h2>
          <HexColorPicker color={bgColor} onChange={setBgColor} />
        </div>
        <div>
          <h2 htmlFor="">text color</h2>
          <HexColorPicker color={textColor} onChange={setTextColor} />
        </div>
      </div>

      <div className="text-sm capitalize">
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

      <div
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
      </div>
    </div>
  );
};
