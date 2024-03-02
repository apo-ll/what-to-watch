// app/Details/[...slug]/page.jsx

"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Details() {
  /* Extract the media_type and the id */
  const { media_type, id } = useParams();

  console.log(media_type, id);

  /* Fetching the information about the movie/tv */
  async function fetchDetails(id, media_type) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    return response.json();
  }

  /* Fetching Trailers of the movie/tv */
  async function fetchTrailers(id, media_type) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?language=en-US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    );
    return response.json();
  }

  /* sending the data in form of of 'info' name */
  const { data: info, isLoading } = useQuery({
    queryKey: ["details", id, media_type],
    queryFn: async () => await fetchDetails(id, media_type),
  });

  /* Sending the data inform of trailer name */
  const { data: trailer } = useQuery({
    queryKey: ["trailers", id, media_type],
    queryFn: async () => await fetchTrailers(id, media_type),
  });

  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const videoRef = useRef(null);

  const handleThumbnailClick = (trailerKey, index) => {
    setCurrentTrailer(trailerKey);
    setCurrentTrailerIndex(index);
  };

  useEffect(() => {
    // Assuming trailers is your array of trailers
    if (trailer && trailer.results.length > 0) {
      setCurrentTrailer(trailer.results[0].key);
    }
  }, [trailer]);

  const filteredTrailers = trailer?.results.filter((trailer) =>
    trailer.name.includes("Trailer")
  );

  return (
    <div className="container flex flex-row gap-3 justify-between text-azure-radiance-50 p-2">
      {isLoading && (
        <div className="flex items-center justify-center h-[600px]">
          <Oval color="#144056" height={100} width={100} />
        </div>
      )}
      <div className="gap-5 flex lg:flex-row flex-col container  ">
        <div className="flex flex-col justify-between gap-5 container">
          {currentTrailer && (
            <iframe
              width="1100"
              height="700"
              src={`https://www.youtube.com/embed/${filteredTrailers[currentTrailerIndex].key}?autoplay=1&controls=1&mute=0&showinfo=0&autohide=1&modestbranding=0`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              className="drop-shadow-[0px_10px_20px_rgba(255,255,255,0.25)]  backdrop-blur-3xl rounded-xl"
            ></iframe>
          )}

          <div className="flex flex-col gap-6 mb-10 w-full">
            <h1 className="text-3xl mt-5">
              {(info && info.title) || (info && info.name)}
            </h1>
            <p className="text-balance ">{info && info.overview}</p>
          </div>
        </div>

        {/* The Trailers Section */}
        <div className="lg:h-[700px] container w-auto lg:overflow-y-auto overflow-x-auto scroll-smooth border-0 border-white rounded-lg px-3">
          <div className="flex lg:flex-col flex-row gap-4">
            {filteredTrailers &&
              filteredTrailers.map((trailer, index) => (
                <div
                  className="p-3 overflow-x-auto flex flex-col outline-1 o"
                  key={trailer.key}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
                    width={448}
                    height={299}
                    alt={trailer.title}
                    onClick={() => handleThumbnailClick(trailer.key, index)}
                    className="object-cover rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
                    unoptimized
                  />
                  <h1 className="font-medium text-sm top-[223px] left-[25px]">
                    {trailer.name}
                  </h1>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
