import React, { useContext } from "react";
import { EditAlbumPosterStyleA } from "./style-a/edit-album-poster";
import { EditAlbumPosterStyleB } from "./style-b/edit-album-poster";
import { EditAlbumPosterStyleC } from "./style-c/edit-album-poster";
import { EditContext } from "./edit-context";

export const EditAlbumPoster = ({ edit, setEdit }) => {
  const { style } = useContext(EditContext);
  return (
    <div className="relative w-full max-w-[350px] min-w-[350px] md:min-w-[calc(350px*1.6)] md:max-w-[calc(350px*1.6)] aspect-[2/3] bg-slate-100 text-slate-900 overflow-y-clip shadow-md">
      {style === "1" && <EditAlbumPosterStyleA edit={edit} setEdit={setEdit} />}
      {style === "2" && <EditAlbumPosterStyleB edit={edit} setEdit={setEdit} />}
      {style === "3" && <EditAlbumPosterStyleC edit={edit} setEdit={setEdit} />}
    </div>
  );
};
