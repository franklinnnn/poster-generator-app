"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { calculateAlbumLength, getGenres } from "@/utils/spotify";

import { toPng } from "html-to-image";
import { getQrCode } from "@/utils/qrcode";
import {
  AlbumSelectStyle,
  AlbumSelectStyleLoader,
} from "@/components/posters/albums/select-style";
import { AlbumPosterLoader } from "@/components/posters/albums/style-a/album-poster-loader";
import { EditAlbumPosterStyleA } from "@/components/posters/albums/style-a/edit-album-poster";
import { AlbumPosterStyleA } from "@/components/posters/albums/style-a/album-poster";
import { AlbumPoster } from "@/components/posters/albums/album-poster";
import { EditAlbumPoster } from "@/components/posters/albums/edit-album-poster";

const AlbumPosterPage = () => {
  const params = useParams();
  const { id } = params;
  const posterRef = useRef(null);
  const [album, setAlbum] = useState(null);
  const [editAlbum, setEditAlbum] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [style, setStyle] = useState("1");

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

        console.log(albumResponse);

        setAlbum(albumResponse.data);
        setEditAlbum(albumResponse.data);
        setAlbum((prev) => ({ ...prev, is_edited: false }));
        setEditAlbum((prev) => ({ ...prev, is_edited: false }));

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
    console.log("editing poster");
  };

  const handleRevertOriginal = () => {
    setAlbum((prev) => ({ ...prev, is_edited: false }));
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

  const handleSelectStyle = (value) => {
    setStyle(value);
    console.log(style);
  };

  console.log("is edited", album.is_edited);

  return (
    <div className="flex flex-col items-center justify-start gap-6 p-4 min-h-96">
      <div className="flex flex-col md:flex-row w-full max-w-[1000px]">
        <div ref={posterRef} className="flex justify-center w-full md:w-2/3">
          <div>
            {showEdit ? (
              <>
                {loading ? (
                  <AlbumPosterLoader />
                ) : (
                  <EditAlbumPoster edit={editAlbum} setEdit={setEditAlbum} />
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <AlbumPosterLoader />
                ) : (
                  <AlbumPoster
                    album={album.is_edited ? editAlbum : album}
                    posterRef={posterRef}
                    style={style}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {loading ? (
          <AlbumSelectStyleLoader />
        ) : (
          <AlbumSelectStyle setStyle={setStyle} album={album} />
        )}
      </div>
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
    </div>
  );
};

export default AlbumPosterPage;
