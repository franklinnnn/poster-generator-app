import { useState, useEffect, useRef } from "react";

const useColorPalette = (imageSrc, numColors = 5) => {
  const [palette, setPalette] = useState([]);
  const imgRef = useRef(null);

  useEffect(() => {
    let colorThief;

    const handleColorThief = async () => {
      const { default: ColorThief } = await import("colorthief");
      colorThief = new ColorThief();

      if (imgRef.current && imgRef.current.complete) {
        extractColors(colorThief);
      } else {
        imgRef.current.addEventListener("load", () =>
          extractColors(colorThief)
        );
      }
    };

    handleColorThief();

    return () => {
      if (imgRef.current) {
        imgRef.current.removeEventListener("load", () =>
          extractColors(colorThief)
        );
      }
    };
  }, [imageSrc]);

  const extractColors = (colorThief) => {
    const colors = colorThief.getPalette(imgRef.current, numColors);
    setPalette(colors);
  };

  return [palette, imgRef];
};

export default useColorPalette;
