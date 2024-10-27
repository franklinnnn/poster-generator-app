import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import EditProvider, { EditContext } from "./albums/edit-context";

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

  // Local state to track when all updates are complete
  const [isReadyToNavigate, setIsReadyToNavigate] = useState(false);
  const [urlToNavigate, setUrlToNavigate] = useState(null);

  const handleOnClickSample = (url, newBgColor, newTextColor, newStyle) => {
    console.log("onclick", newBgColor, newTextColor, newStyle);
    setIsReadyToNavigate(false); // Reset readiness state before updating
    setUrlToNavigate(url); // Set the URL for navigation

    // Update all states as needed
    setBgColor(newBgColor);
    setTextColor(newTextColor);
    setStyle(newStyle);

    // Once all state updates are triggered, we can mark it ready
    setIsReadyToNavigate(true);
  };

  // Use useEffect to handle routing once the states are updated
  useEffect(() => {
    if (isReadyToNavigate && urlToNavigate) {
      router.push(urlToNavigate); // Navigate after all states are updated
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
      {/* <Link
        href="/album/79CDvmQOwJBEpd6gL6zgN9"
        className="relative md:w-72 aspect-[2/3] bg-primary"
      >
        <Image
          src="/landing/poster-a.png"
          alt="Poster A"
          fill={true}
          className="object-cover"
        />
      </Link>
      <Link
        href="/album/4KjbNbnTnJ97kZgQkOHr6v"
        className="relative md:w-72 aspect-[2/3]"
      >
        <Image
          src="/landing/poster-b.png"
          alt="Poster B"
          fill={true}
          className="object-cover"
        />
      </Link>
      <Link
        href="/album/1A2GTWGtFfWp7KSQTwWOyo"
        className="relative md:w-72 aspect-[2/3]"
      >
        <Image
          src="/landing/poster-c.png"
          alt="Poster C"
          fill={true}
          className="object-cover"
        />
      </Link> */}
    </div>
  );
};
