import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { EditContext } from "./albums/edit-context";

export const SamplePosters = () => {
  const router = useRouter();
  const [posterUrl, setPosterUrl] = useState(null);
  const { bgColor, setBgColor, textColor, setTextColor, setStyle } =
    useContext(EditContext);

  const samples = [
    {
      url: "/album/79CDvmQOwJBEpd6gL6zgN9",
      bgColor: "#F1F5F9",
      textColor: "#0F172A",
      src: "/landing/poster-a.png",
      style: "1",
    },
    {
      url: "/album/4KjbNbnTnJ97kZgQkOHr6v",
      bgColor: "#29333d",
      textColor: "#eaeaea",
      src: "/landing/poster-b.png",
      style: "2",
    },
    {
      url: "/album/1A2GTWGtFfWp7KSQTwWOyo",
      bgColor: "#9a9a9a",
      textColor: "#000000",
      src: "/landing/poster-c.png",
      style: "3",
    },
  ];

  const [isReadyToNavigate, setIsReadyToNavigate] = useState(false);
  const [urlToNavigate, setUrlToNavigate] = useState(null);

  const handleOnClickSample = (url, newBgColor, newTextColor, newStyle) => {
    setIsReadyToNavigate(false);
    setUrlToNavigate(url);

    setBgColor(newBgColor);
    setTextColor(newTextColor);
    setStyle(newStyle);

    setIsReadyToNavigate(true);
  };

  useEffect(() => {
    if (isReadyToNavigate && urlToNavigate) {
      router.push(urlToNavigate);
    }
  }, [isReadyToNavigate, urlToNavigate, router]);

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
      {samples.map((sample) => (
        <div
          key={sample.url}
          href="/album/79CDvmQOwJBEpd6gL6zgN9"
          className="relative md:w-72 aspect-[2/3] bg-primary shadow-md hover:cursor-pointer"
          onClick={() =>
            handleOnClickSample(
              sample.url,
              sample.bgColor,
              sample.textColor,
              sample.style
            )
          }
        >
          <Image
            src={sample.src}
            alt="Poster A"
            fill={true}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};
