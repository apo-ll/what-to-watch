"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Oval } from "react-loader-spinner";
import { Suspense } from "react";

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
    <main className="container">
      <div className="relative mb-10">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <span className="material-symbols-outlined fill-white">Search</span>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie, tv show, person..."
          className="bg-zinc-800 border-2 w-full pl-16 rounded-[40px] h-[65px] border-indigo-300/50 text-neutral-200 text-[22px] font-normal outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent focus:ring-offset-0 focus:ring-offset-transparent"
        />
      </div>

      {/* Loading Effect */}
      {isLoading && (
        <div className="flex items-center justify-center h-[600px]">
          <Oval color="#144056" height={100} width={100} />
        </div>
      )}
      <div className="grid grid-cols-7 gap-3">
        {data?.results.map((result) => (
          <div key={result.id} className=" text-center gap-[8px]">
            <Link href={`/Details/${result.media_type}/${result.id}/`}>
              <div className="p-2">
                <Image
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = 'fallback-image-url';
                  }}
                  src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                  alt={result.name}
                  width={200}
                  height={300}
                  className="rounded-lg   hover:outline hover:outline-white hover:outline-offset-0 hover:rounded-lg"
                />
                <h1 className="mt-3">{result.name || result.title}</h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
