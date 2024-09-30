"use client";
import {
  AlbumPoster,
  AlbumPosterLoader,
} from "@/components/posters/album-poster";
import { EditAlbumPoster } from "@/components/posters/edit-album-poster";
import { getGenres } from "@/utils/spotify";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AlbumPosterPage = () => {
  const [album, setAlbum] = useState(null);
  const [editAlbum, setEditAlbum] = useState(null);
  const [genres, setGenres] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({
    isEdited: false,
    title: null,
    artist: null,
    tracks: null,
    genres: null,
    swatch: null,
  });
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

        getGenres(
          albumResponse.data.artists[0].id,
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

  console.log(editAlbum);

  const handleEditPoster = () => {
    // do something
    setShowEdit(true);
    setEditAlbum((prev) => ({ ...prev, isEdited: false }));
    console.log("editing poster");
  };

  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleSaveEdit = () => {
    console.log("saved edit");
    alert("poster edited");
    setEditAlbum((prev) => ({ ...prev, isEdited: true }));
    setShowEdit(false);
  };

  const handleSavePoster = () => {
    console.log("saved poster");
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
            <AlbumPoster album={editAlbum.isEdited ? editAlbum : album} />
          )}
        </>
      )}
      <div className="flex justify-center gap-6 w-full">
        <button
          className="btn btn-primary rounded-sm"
          onClick={showEdit ? () => setShowEdit(false) : handleEditPoster}
        >
          {showEdit ? "Cancel" : "Edit poster"}
        </button>
        <button
          className="btn btn-primary rounded-sm"
          onClick={showEdit ? handleSaveEdit : handleSavePoster}
        >
          {showEdit ? "Save edit" : "Save poster"}
        </button>
      </div>
    </div>
  );
};

export default AlbumPosterPage;
