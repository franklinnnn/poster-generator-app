import React, { useContext } from "react";
import { EditAlbumPosterStyleA } from "./style-a/edit-album-poster";
import { EditAlbumPosterStyleB } from "./style-b/edit-album-poster";
import { EditAlbumPosterStyleC } from "./style-c/edit-album-poster";
import { EditContext } from "./edit-context";

export const EditAlbumPoster = ({ edit, setEdit }) => {
  const { style } = useContext(EditContext);
  return (
    <>
      {style === "1" && <EditAlbumPosterStyleA edit={edit} setEdit={setEdit} />}
      {style === "2" && <EditAlbumPosterStyleB edit={edit} setEdit={setEdit} />}
      {style === "3" && <EditAlbumPosterStyleC edit={edit} setEdit={setEdit} />}
    </>
  );
};
