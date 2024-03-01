// app/Details/[...slug]/page.jsx

"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import { useState, useEffect } from "react";
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

  const handleThumbnailClick = (trailerKey) => {
    setCurrentTrailer(trailerKey);
  };

  useEffect(() => {
    // Assuming trailers is your array of trailers
    if (trailer && trailer.results.length > 0) {
      setCurrentTrailer(trailer.results[0].key);
    }
  }, [trailer]);

  return (
    <div className="container flex flex-row gap-3 justify-between">
      {isLoading && (
        <div className="flex items-center justify-center h-[600px]">
          <Oval color="#144056" height={100} width={100} />
        </div>
      )}
      <div className="items-start gap-5 flex flex-row  ">
        <div className="flex flex-col justify-between gap-5">
          {currentTrailer && (
            <iframe
              width="1000"
              height='550'
              src={`https://www.youtube.com/embed/${currentTrailer}?autoplay=1&controls=1&mute=1&showinfo=0&autohide=1&modestbranding=1&loop=1&playlist=${currentTrailer}`}
              title="Trailer"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              className="rounded-xl"
            ></iframe>
          )}

          <div className="flex flex-col gap-6 mb-10   max-w-2xl">
            <h1 className="text-3xl mt-5">
              {(info && info.title) || (info && info.name)}
            </h1>
            <p className="text-wrap ">{info && info.overview}</p>
          </div>
        </div>
        <div className=" flex flex-col h-[650px] overflow-y-auto border border-white rounded-lg px-3">
          <div className=" p-5 z-[9999px] bg-white">
            <h2 className="  text-black ">Trailers</h2>
          </div>

          <div className="flex flex-col gap-4">
            {trailer &&
              trailer.results.map((trailer) => (
                <div
                  className={`${
                    currentTrailer === trailer.key
                      ? "bg-white opacity-50 text-black"
                      : "hover:bg-white hover:opacity-30 transition-all duration-300 ease-in-out"
                  } flex flex-row  p-3`}
                >
                  <div style={{ width: "400px", height: "200px" }}>
                    <Image
                      src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
                      width={400}
                      height={200}
                      alt={trailer.title}
                      onClick={() => handleThumbnailClick(trailer.key)}
                      className="w-[400px]  rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
                      unoptimized
                    />
                </div>
                  <h1 className="">{trailer.name}</h1>
                </div>
              ))}
          </div>
        </div>


      </div>
    </div>
  );
}
