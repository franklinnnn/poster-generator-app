import { useContext } from "react";
import { EditContext } from "./edit-context";
import { toCanvas, toPng } from "html-to-image";

export const PageButtons = ({
  album,
  setAlbum,
  editAlbum,
  setEditAlbum,
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
    alert("poster reverted");
    setAlbum((prev) => ({ ...prev, is_edited: false }));
    setEditAlbum(album);
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
    setEditAlbum((prev) => ({ ...prev, is_edited: true }));
    setShowEdit(false);
  };

  const handleCancelEdit = () => {
    console.log("cancel edit");
    setAlbum((prev) => ({ ...prev, is_edited: false }));
    setEditAlbum(album);
    setShowEdit(false);
  };

  // const handleSavePoster = () => {
  //   toPng(posterRef.current, { cacheBust: false })
  //     .then((dataUrl) => {
  //       const link = document.createElement("a");
  //       link.download = `album-poster-${album.artists[0].name}-${album.name}-swatch-frame.png`;
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleSavePoster = () => {
    toPng(posterRef.current).then((dataUrl) => {
      var img = new Image();
      img.src = dataUrl;
      const newWindow = window.open();
      if (newWindow) {
        const img = newWindow.document.createElement("img");
        img.src = dataUrl;

        img.style.maxWidth = "100%";
        img.style.height = "auto";

        newWindow.document.body.appendChild(img);
        newWindow.document.title = `Swatch Frame - ${album.artists[0].name}-${album.name}`;
      } else {
        console.error("Failed to open a new window");
      }
    });
  };

  return (
    <div className="flex justify-center gap-4 w-full mb-12">
      <button
        className="btn btn-primary rounded-sm capitalize"
        onClick={showEdit ? handleCancelEdit : handleEditPoster}
      >
        {showEdit ? "Cancel" : "Edit poster"}
      </button>
      {showEdit ? null : (
        <button
          className="btn btn-primary rounded-sm capitalize"
          onClick={handleRevertOriginal}
          disabled={!album.is_edited ? !album.is_edited : null}
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
