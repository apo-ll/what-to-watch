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
    <div className=" ">
      <div ref={emblaRef} className="overflow-hidden">
        <div
          id="container"
          className="flex flex-row gap-4 carousel-items"
        >
          {data.results.map((trending) => (
            <Link
              href={`/Details/${trending.media_type}/${trending.id}/`}
              className="shrink-0 grow-0 w-auto items-center"
            >
              <div
                id={trending.id}
                className="flex flex-col items-center gap-3 pl-3"
              >
                <Image
                  alt={trending.title}
                  unoptimized
                  loading="lazy"
                  width={250}
                  height={150}
                  src={`https://image.tmdb.org/t/p/original${trending.poster_path}`}
                  className="rounded-lg hover:outline hover:drop-shadow-[0px_10px_20px_rgba(255,255,255,0.25)] hover:transition-all hover:ease-in-out duration-300 hover:outline-white hover:outline-offset-0"
                />
                <h1 className="text-balance w-2/3 text-center">
                  {trending.name || trending.title}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>

        <div className="*:border-2 *:px-3 *:py-1 *:rounded-full *:border-white *:text-white justify-end flex flex-row gap-3 mt-4">
          <button onClick={scrollPrev}>prev</button>
          <button onClick={scrollNext}>next</button>
        </div>
      </div>


  );
};

export default HomeCarousel;
