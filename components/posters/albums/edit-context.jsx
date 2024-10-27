"use client";

import { createContext, useState } from "react";

export const EditContext = createContext();

const EditProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState("#F1F5F9");
  const [textColor, setTextColor] = useState("#0F172A");
  const [artistTextSize, setArtistTextSize] = useState(0.8);
  const [albumTextSize, setAlbumTextSize] = useState(1);
  const [tracksTextSize, setTracksTextSize] = useState(0.5);
  const [style, setStyle] = useState("1");

  return (
    <EditContext.Provider
      value={{
        bgColor,
        setBgColor,
        textColor,
        setTextColor,
        artistTextSize,
        setArtistTextSize,
        albumTextSize,
        setAlbumTextSize,
        tracksTextSize,
        setTracksTextSize,
        style,
        setStyle,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export default EditProvider;
