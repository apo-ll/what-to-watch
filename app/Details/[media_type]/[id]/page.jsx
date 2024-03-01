// app/Details/[...slug]/page.jsx

"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import Image from "next/image";

export default function Details() {
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

  return (
    <div className="container">
      {isLoading && (
        <div className="flex items-center justify-center h-[600px]">
          <Oval color="#144056" height={100} width={100} />
        </div>
      )}
      <div className="items-center flex text-center ">
        <iframe
          width="1200"
          height="700"
            src={`https://www.youtube.com/embed/${trailer?.results[0]?.key}?autoplay=1&controls=1&mute=1&showinfo=0&autohide=1&modestbranding=1&loop=1&playlist=${trailer?.results[0]?.key}`}
          title={info && info.title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          className="rounded-xl"
        ></iframe>
       
      </div>
      <div className="flex flex-col gap-6 mb-10   max-w-2xl">
        <h1 className="text-3xl mt-5">{info && info.title || info && info.name }</h1>
        <p className="text-wrap ">{info && info.overview}</p>
      </div>
    </div>
  );
}
