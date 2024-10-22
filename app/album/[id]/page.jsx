"use client";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { calculateAlbumLength, getGenres } from "@/utils/spotify";

import { toPng } from "html-to-image";
import { getQrCode } from "@/utils/qrcode";
import {
  AlbumSelectStyle,
  AlbumSelectStyleLoader,
} from "@/components/posters/albums/select-style";
import { AlbumPosterLoader } from "@/components/posters/albums/style-a/album-poster-loader";
import { AlbumPoster } from "@/components/posters/albums/album-poster";
import { EditAlbumPoster } from "@/components/posters/albums/edit-album-poster";
import { EditOptions } from "@/components/posters/albums/edit-options";
import EditProvider, {
  EditContext,
} from "@/components/posters/albums/edit-context";
import { PageButtons } from "@/components/posters/albums/page-buttons";

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

  return (
    <EditProvider>
      <div className="flex flex-col items-center justify-start gap-6 p-4 min-h-96">
        <div className="flex flex-col md:flex-row w-full max-w-[1000px]">
          <div ref={posterRef} className="flex justify-center w-full md:w-2/3">
            <div>
              {showEdit ? (
                <>
                  {loading ? (
                    <AlbumPosterLoader />
                  ) : (
                    <EditAlbumPoster
                      edit={editAlbum}
                      setEdit={setEditAlbum}
                      style={style}
                    />
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
            <>
              {showEdit ? (
                <EditOptions />
              ) : (
                <AlbumSelectStyle setStyle={setStyle} album={album} />
              )}
            </>
          )}
        </div>
        <PageButtons
          album={album}
          setAlbum={setAlbum}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          posterRef={posterRef}
        />
      </div>
    </EditProvider>
  );
};

export default AlbumPosterPage;
