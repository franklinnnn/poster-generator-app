import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import EditProvider, { EditContext } from "./albums/edit-context";

export const SamplePosters = () => {
  const router = useRouter();
  const { bgColor, setBgColor, textColor, setTextColor } =
    useContext(EditContext);

  const samples = [
    {
      url: "/album/79CDvmQOwJBEpd6gL6zgN9",
      bgColor: "#F1F5F9",
      textColor: "#0F172A",
      src: "/landing/poster-a.png",
    },
    {
      url: "/album/4KjbNbnTnJ97kZgQkOHr6v",
      bgColor: "#F1F5F9",
      textColor: "#0F172A",
      src: "/landing/poster-b.png",
    },
    {
      url: "/album/1A2GTWGtFfWp7KSQTwWOyo",
      bgColor: "#F1F5F9",
      textColor: "#0F172A",
      src: "/landing/poster-c.png",
    },
  ];

  const handleOnClickSample = (url) => {
    console.log("bg color", bgColor, "text color", textColor);
    console.log("url", url);
  };
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
      {samples.map((sample) => (
        <div
          key={sample.url}
          href="/album/79CDvmQOwJBEpd6gL6zgN9"
          className="relative md:w-72 aspect-[2/3] bg-primary hover:cursor-pointer"
          onClick={() => handleOnClickSample(sample.url)}
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
