import React, { useContext } from "react";
import { AlbumPosterStyleA } from "./style-a/album-poster";
import { AlbumPosterStyleB } from "./style-b/album-poster";
import { AlbumPosterStyleC } from "./style-c/album-poster";
import { EditContext } from "./edit-context";

export const AlbumPoster = ({ album, posterRef }) => {
  const { style } = useContext(EditContext);

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
