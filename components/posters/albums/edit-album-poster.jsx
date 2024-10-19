import React from "react";
import { EditAlbumPosterStyleA } from "./style-a/edit-album-poster";
import { EditAlbumPosterStyleB } from "./style-b/edit-album-poster";
import { EditAlbumPosterStyleC } from "./style-c/edit-album-poster";

export const EditAlbumPoster = ({ edit, setEdit, style }) => {
  console.log("edit album", style);
  return (
    <>
      {style === "1" && <EditAlbumPosterStyleA edit={edit} setEdit={setEdit} />}
      {style === "2" && <EditAlbumPosterStyleB edit={edit} setEdit={setEdit} />}
      {style === "3" && <EditAlbumPosterStyleC edit={edit} setEdit={setEdit} />}
    </>
  );
};
