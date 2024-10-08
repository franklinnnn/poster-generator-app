import React from "react";
import {
  AlbumPosterStyleA,
  AlbumPosterStyleAThumb,
} from "./style-a/album-poster";
import {
  AlbumPosterStyleB,
  AlbumPosterStyleBThumb,
} from "./style-b/album-poster";

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
  ];

  const handleStyleSelect = (id) => {
    setStyle(id);
  };

  return (
    <>
      <div className="md:w-1/3 pl-0 md:pl-2 flex flex-col items-center md:items-start md:justify-start ">
        {/* <p className="m-2 text uppercase">select poster style</p>
        <div className="flex flex-row md:flex-col gap-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              className="skeleton aspect-[2/3] w-24 md:w-40 h-auto m-2 rounded-none"
              key={i}
              onClick={() => handleSelectStyle(i.toString())}
            />
          ))}
          {styles.map((style) => (
            <div
              className="aspect-[2/3] w-24 md:w-40 h-auto m-2 rounded-none border-2 hover:cursor-pointer"
              key={style.id}
              onClick={() => handleStyleSelect(style.id)}
            >
              <div className="scale-50">{styles.component}</div>
            </div>
          ))}
        </div> */}

        <p className="m-2 text uppercase">select poster style</p>
        <div className="flex md:flex-col gap-4">
          {/* <div className="mb-6 h-60 w-24 scale-[30%] origin-top-left">
            <AlbumPosterStyleA album={album} />
          </div>
          <div className="mb-6 h-60 w-24 scale-[30%] origin-top-left">
            <AlbumPosterStyleB album={album} />
          </div> */}
        </div>
        {styles.map((style) => (
          <div
            className="mb-6 h-60 w-24 scale-[30%] origin-top-left hover:cursor-pointer hover:scale-[31%] transition"
            key={style.id}
            onClick={() => handleStyleSelect(style.id)}
          >
            {style.component}
          </div>
        ))}
      </div>
    </>
  );
};
