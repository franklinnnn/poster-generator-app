import React, { useContext } from "react";
import { EditContext } from "./edit-context";
import { toPng } from "html-to-image";

export const PageButtons = ({
  album,
  setAlbum,
  showEdit,
  setShowEdit,
  posterRef,
}) => {
  const {
    setBgColor,
    setTextColor,
    setArtistTextSize,
    setAlbumTextSize,
    setTracksTextSize,
  } = useContext(EditContext);

  const handleEditPoster = () => {
    // do something
    setShowEdit(true);
    console.log("editing poster");
  };
  const handleRevertOriginal = () => {
    setAlbum((prev) => ({ ...prev, is_edited: false }));
    setBgColor("#F1F5F9");
    setTextColor("#0F172A");
    setArtistTextSize(0.8);
    setAlbumTextSize(1);
    setTracksTextSize(0.5);
  };

  const handleSaveEdit = () => {
    console.log("saved edit");
    alert("poster edited");
    setAlbum((prev) => ({ ...prev, is_edited: true }));
    setShowEdit(false);
  };

  const handleSavePoster = () => {
    console.log("save poster");
    toPng(posterRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `album-poster-${album.artists[0].name}-${album.name}-swatch-frame.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center gap-6 w-full">
      <button
        className="btn btn-primary rounded-sm capitalize"
        onClick={showEdit ? () => setShowEdit(false) : handleEditPoster}
      >
        {showEdit ? "Cancel" : "Edit poster"}
      </button>
      {showEdit ? null : (
        <button
          className="btn btn-primary rounded-sm capitalize"
          onClick={handleRevertOriginal}
          // disabled={!editAlbum.is_edited ? !editAlbum.is_edited : null}
        >
          revert original
        </button>
      )}
      <button
        className="btn btn-primary rounded-sm capitalize"
        onClick={showEdit ? handleSaveEdit : handleSavePoster}
      >
        {showEdit ? "Save edit" : "Save poster"}
      </button>
    </div>
  );
};
