"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const HomeCarousel = () => {
  const { data, isLoading } = useQuery("trending", Trending);

  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi && emblaApi.hasPrev()) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi && emblaApi.hasNext()) emblaApi.scrollNext();
  }, [emblaApi]);

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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="embla container">
      <div ref={emblaRef} className="overflow-hidden">
        <div id="container" className="flex gap-4">
          {data.results.map((trending) => (
            <Link
              key={trending.id}
              href={`/Details/${trending.media_type}/${trending.id}/`}
              className="flex w-auto items-center gap-4"
            >
              <div
                id={trending.id}
                className="flex flex-col items-center text-center pl-3"
              >
                <Image
                  alt={trending.title}
                  unoptimized
                  width={250}
                  height={150}
                  src={`https://image.tmdb.org/t/p/original${trending.poster_path}`}
                  className="rounded-lg hover:outline hover:drop-shadow-[0px_10px_20px_rgba(255,255,255,0.25)] transition-all ease-in-out duration-300 hover:outline-white hover:outline-offset-0 hover:rounded-lg"
                  loading="lazy"
                />
                <h1 className="mt-3 max-w-sm">
                  {trending.name || trending.title}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="justify-end flex gap-3 mt-4">
        <button
          onClick={scrollPrev}
          disabled={!emblaApi || !emblaApi.hasPrev()}
          className="border-2 px-3 py-1 rounded-full border-white text-white"
        >
          prev
        </button>
        <button
          onClick={scrollNext}
          disabled={!emblaApi || !emblaApi.hasNext()}
          className="border-2 px-3 py-1 rounded-full border-white text-white"
        >
          next
        </button>
      </div>
    </div>
  );
};

export default HomeCarousel;
