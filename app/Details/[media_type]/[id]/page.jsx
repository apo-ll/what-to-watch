// app/Details/[...slug]/page.jsx

"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import Image from "next/image";

export default function Details() {
  const { media_type, id } = useParams();

  console.log(media_type, id);

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

  const { data, isLoading } = useQuery({
    queryKey: ["details", id, media_type],
    queryFn: async () => await fetchDetails(id, media_type),
  });

  return (
    <div className="container">
      {isLoading && (
        <div className="flex items-center justify-center h-[600px]">
          <Oval color="#144056" height={100} width={100} />
        </div>
      )}
      <div
        key={data}
        className="relative items-center flex text-center justify-cente"
      >
        <Image
          src={`https://image.tmdb.org/t/p/original${
            data && data.backdrop_path
          }`}
          alt={data && data.original_name}
          width={900}
          height={700}
          className="rounded-lg "
        />
        <button className="absolute text-white text-3xl  justify-center">
          watch trailer
        </button>
      </div>
      <div className="flex flex-col gap-3 mb-10  max-w-2xl">
        <h1 className="text-3xl mt-10">Overview</h1>
        <p className="text-wrap ">{data && data.overview}</p>
      </div>
    </div>
  );
}
