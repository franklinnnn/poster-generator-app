import React from "react";
import { AlbumPosterStyleA } from "./style-a/album-poster";
import { AlbumPosterStyleB } from "./style-b/album-poster";
import { AlbumPosterStyleC } from "./style-c/album-poster";

export const AlbumPoster = ({ album, posterRef, style }) => {
  return (
    <>
      {style === "1" && (
        <AlbumPosterStyleA album={album} posterRef={posterRef} />
      )}
      {style === "2" && (
        <AlbumPosterStyleB album={album} posterRef={posterRef} />
      )}
      {style === "3" && (
        <AlbumPosterStyleC album={album} posterRef={posterRef} />
      )}
    </>
  );
};
