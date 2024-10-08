import axios from "axios";

export const getQrCode = async (url, setAlbum, setEditAlbum, setLoading) => {
  try {
    const requestUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=500x500`;

    const response = await axios.get(requestUrl, {
      responseType: "blob",
    });
    const qr_code_url = URL.createObjectURL(response.data);

    setAlbum((prev) => ({ ...prev, qr_code_url }));
    setEditAlbum((prev) => ({ ...prev, qr_code_url }));
  } catch (error) {
    console.log("Error getting QR Code", error);
  } finally {
    setLoading(false);
  }
};
