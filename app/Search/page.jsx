"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Oval } from "react-loader-spinner"
import fallback from "@/public/placeholder.jpg";

export default function Search() {
  /* using useState */

  const [searchTerm, setSearchTerm] = useState("");
  const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  /* Fetching Data */

  const Search = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  };

  /* Using useQuery hook and refetch */

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => await Search(),
    enabled: false,
  });

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  /* Rendering the Page */

  return (
    <>
      <main className="container ">
        <div className="relative mb-10">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <span className="material-symbols-outlined fill-white">Search</span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie, tv show, person..."
            className="bg-azure-radiance-950 border-2 w-full placeholder-white pl-16 rounded-[40px] h-[65px] border-azure-radiance-800 text-white lg:text-[22px] md:text-lg text-sm font-normal outline-none focus:ring-2 focus:ring-azure-radiance-900  focus:border-transparent focus:ring-offset-0 focus:ring-offset-transparent"
          />
        </div>

        {/* Loading Effect */}
        {isLoading && (
          <div className="flex items-center justify-center h-[600px]">
            <Oval color="#144056" height={100} width={100} />
          </div>
        )}

        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3">
          {data?.results.map((result) => (
            <div key={result.id} className=" text-center gap-[8px]">
              <Link href={`/Details/${result.media_type}/${result.id}/`}>
                <div className="p-2 flex flex-col items-center">
                  <Image
                    src={
                      result.poster_path ? 
                      `https://image.tmdb.org/t/p/w500${result.poster_path}` : 
                      "/placeholder.jpg" 
                    }
                    alt={result.name}
                    unoptimized
                    width={250}
                    height={150}
                    className="rounded-lg hover:outline hover:drop-shadow-[0px_10px_20px_rgba(255,255,255,0.25)] transition-all ease-in-out duration-300 hover:outline-white hover:outline-offset-0 hover:rounded-lg"
                  />
                  <h1 className="mt-3 w-1/2">{result.name || result.title}</h1>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
