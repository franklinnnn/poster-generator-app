import axios from "axios";

export const calculateAlbumLength = async (id, setAlbumLength, setLoading) => {
  try {
    const tokenResponse = await axios.get("/api/spotify/token");
    const accessToken = tokenResponse.data.accessToken;

    const requestUrl = `https://api.spotify.com/v1/albums/${id}/tracks?limit=20`;
    const tracks = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const trackDurations = tracks.data.items.map((track) => track.duration_ms);
    const albumDurationMs = trackDurations.reduce((a, b) => a + b, 0);

    let h, m, s;
    // h = Math.floor(albumDurationMs / 1000 / 60 / 60);
    m = Math.floor((albumDurationMs / 1000 / 60 / 60) * 60);
    s = Math.floor(((albumDurationMs / 1000 / 60 / 60) * 60 - m) * 60);

    s < 10 ? (s = `0${s}`) : (s = `${s}`);
    m < 10 ? (m = `0${m}`) : (m = `${m}`);
    h < 10 ? (h = `0${h}`) : (h = `${h}`);

    const length = `${m}:${s}`;

    setAlbumLength(length);
  } catch (error) {
    console.log("Error calculating album length", error);
  } finally {
    setLoading(false);
  }
};
