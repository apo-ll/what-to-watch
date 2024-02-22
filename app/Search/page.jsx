"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Search() {
  {
    /* using useState */
  }
  const [searchTerm, setSearchTerm] = useState("");
  const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  {
    /* Fetching Data */
  }
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

  {
    /* Using useQuery hook and refetch */
  }
  const { data, refetch } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => await Search(),
    enabled: false,
  });

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  {
    /* Rendering the Page */
  }
  return (
    <main className="container">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <span className="material-symbols-outlined fill-white">Search</span>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie, tv show, person..."
          className="bg-zinc-800 border-2 w-[844px] pl-16 rounded-[40px] h-[65px] border-indigo-300 text-neutral-200 text-[22px] font-normal"
        />
        
      </div>

        <div className="grid grid-flow-col gap-4">
            {data?.results.map((result) => (
                <div key={result.id} className=" text-center gap-[8px]">
                  <Link href={`/Details/${result.media_type}/${result.id}/`}>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    alt={result.name}
                    width={150}
                    height={750}
                    className="rounded-lg"
                />
                </Link>
                <h2>{result.title}</h2>
               </div>
            ))}
        </div>
    </main>
  );
}
