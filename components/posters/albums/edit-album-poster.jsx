import React from "react";
import { EditAlbumPosterStyleA } from "./style-a/edit-album-poster";

export const EditAlbumPoster = ({ edit, setEdit, style }) => {
  return (
    <>
      <EditAlbumPosterStyleA edit={edit} setEdit={setEdit} />
    </>
  );
};
