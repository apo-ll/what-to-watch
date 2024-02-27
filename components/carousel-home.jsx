"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const HomeCarousel = () => {
  //using embla hooks
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // The Trending function fetches the trending movies and TV shows from the TMDB API.
  async function Trending() {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
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
    queryKey: ["trending"],
    queryFn: () => Trending(),
  });

  if (isLoading) return <p>Loading...</p>;

  // rendering the carousel

  return (
    <div className="embla container ">
      
      <div ref={emblaRef} className="overflow-hidden">
        <div
          id="container"
          className="flex shrink-0 grow-0   container   gap-4"
        >
          {data.results.map((trending) => (
            <div id={trending.id} className="flex flex-col items-center text-center pl-3 shrink-0 grow-0">
            <Image
              alt={trending.title}
              width={250}
              height={150}
              src={`https://image.tmdb.org/t/p/original${trending.poster_path}`}
              className="rounded-lg"
            />
            <h1 className="mt-3 max-w-sm">{trending.name || trending.title}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="justify-end flex gap-3 mt-4">
      <button onClick={scrollPrev} className="border-2 px-3 py-1 rounded-full border-white text-white">prev</button>
      <button onClick={scrollNext} className="border-2 px-3 py-1 rounded-full border-white text-white">next</button>
      </div>
      
    </div>
  );
};

export default HomeCarousel;
/**/
