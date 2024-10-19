import React from "react";
import {
  AlbumPosterStyleA,
  AlbumPosterStyleAThumb,
} from "./style-a/album-poster";
import {
  AlbumPosterStyleB,
  AlbumPosterStyleBThumb,
} from "./style-b/album-poster";
import { AlbumPosterStyleC } from "./style-c/album-poster";

export const AlbumSelectStyle = ({ setStyle, album }) => {
  const styles = [
    {
      name: "Style A",
      id: "1",
      component: <AlbumPosterStyleA album={album} />,
    },
    {
      name: "Style B",
      id: "2",
      component: <AlbumPosterStyleB album={album} />,
    },
    {
      name: "Style C",
      id: "3",
      component: <AlbumPosterStyleC album={album} />,
    },
  ];

  const handleStyleSelect = (id) => {
    setStyle(id);
  };

  return (
    <>
      <div className="md:w-1/3 pl-0 md:pl-2 flex flex-col items-center md:items-start md:justify-start ">
        <p className="m-2 uppercase font-bold font-display">style</p>
        <div className="flex md:flex-col gap-4">
          {styles.map((style) => (
            <div
              className="h-60 w-24 scale-[30%] origin-top-left hover:cursor-pointer hover:-translate-y-2 transition"
              key={style.id}
              onClick={() => handleStyleSelect(style.id)}
            >
              {style.component}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const AlbumSelectStyleLoader = () => {
  return (
    <>
      <div className="md:w-1/3 pl-0 md:pl-2 flex flex-col items-center md:items-start md:justify-start ">
        <div className="skeleton m-2 h-6 w-40 rounded-none" />
        {Array.from({ length: 2 }, (_, i) => (
          <div
            className="skeleton aspect-[2/3] w-24 md:w-40 h-auto m-2 rounded-none origin-top-left"
            key={i}
          />
        ))}
      </div>
    </>
  );
};
