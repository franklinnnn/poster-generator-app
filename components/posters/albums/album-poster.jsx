import React, { useContext } from "react";
import { AlbumPosterStyleA } from "./style-a/album-poster";
import { AlbumPosterStyleB } from "./style-b/album-poster";
import { AlbumPosterStyleC } from "./style-c/album-poster";
import { EditContext } from "./edit-context";

export const AlbumPoster = ({ album, posterRef }) => {
  const { style } = useContext(EditContext);

  return (
    <div className="relative w-full max-w-[350px] min-w-[350px] md:min-w-[calc(350px*1.6)] md:max-w-[calc(350px*1.6)] aspect-[2/3] bg-slate-100 text-slate-900 overflow-y-clip shadow-md">
      {style === "1" && (
        <AlbumPosterStyleA album={album} posterRef={posterRef} />
      )}
      {style === "2" && (
        <AlbumPosterStyleB album={album} posterRef={posterRef} />
      )}
      {style === "3" && (
        <AlbumPosterStyleC album={album} posterRef={posterRef} />
      )}
    </div>
  );
};
