"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { calculateAlbumLength, getGenres } from "@/utils/spotify";

import {
  AlbumPoster,
  AlbumPosterLoader,
} from "@/components/posters/album-poster";
import { EditAlbumPoster } from "@/components/posters/edit-album-poster";
import { toPng } from "html-to-image";
import { getQrCode } from "@/utils/qrcode";

const AlbumPosterPage = () => {
  const posterRef = useRef(null);
  const [album, setAlbum] = useState(null);
  const [editAlbum, setEditAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const params = useParams();
  const { id } = params;

  // console.log(id);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const tokenResponse = await axios.get("/api/spotify/token");
        const accessToken = tokenResponse.data.accessToken;
        const requestUrl = `https://api.spotify.com/v1/albums/${id}`;

        const albumResponse = await axios.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // console.log("request parameters", id);
        setAlbum(albumResponse.data);
        setEditAlbum(albumResponse.data);
        setEditAlbum((prev) => ({ ...prev, isEdited: false }));

        getGenres(
          albumResponse.data.artists[0].id,
          setAlbum,
          setEditAlbum,
          setLoading
        );
        calculateAlbumLength(
          albumResponse.data.id,
          setAlbum,
          setEditAlbum,
          setLoading
        );
        getQrCode(
          albumResponse.data.external_urls.spotify,
          setAlbum,
          setEditAlbum,
          setLoading
        );
      } catch (error) {
        console.log("Error fetching album: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, []);

  const handleEditPoster = () => {
    // do something
    setShowEdit(true);
    setEditAlbum((prev) => ({ ...prev, isEdited: false }));
    console.log("editing poster");
  };

  const handleRevertOriginal = () => {
    setEditAlbum((prev) => ({ ...prev, isEdited: false }));
  };

  const handleSaveEdit = () => {
    console.log("saved edit");
    alert("poster edited");
    setEditAlbum((prev) => ({ ...prev, isEdited: true }));
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
    <div className="flex flex-col items-center justify-start gap-6 p-4 min-h-96">
      {showEdit ? (
        <>
          {loading ? (
            <AlbumPosterLoader />
          ) : (
            <EditAlbumPoster
              album={album}
              edit={editAlbum}
              setEdit={setEditAlbum}
            />
          )}
        </>
      ) : (
        <>
          {loading ? (
            <AlbumPosterLoader />
          ) : (
            <AlbumPoster
              album={editAlbum.isEdited ? editAlbum : album}
              posterRef={posterRef}
            />
          )}
        </>
      )}
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
            // disabled={!editAlbum.isEdited ? !editAlbum.isEdited : null}
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
    </div>
  );
};

export default AlbumPosterPage;
