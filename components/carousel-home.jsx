"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const HomeCarousel = () => {
  //using embla hooks
  const [emblaRef, emblaApi] = useEmblaCarousel();

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
    <div class="embla   " ref={emblaRef}>
      <div class="embla__viewport overflow-hidden">
        <div class="embla__container flex gap-4 py-4 pl-3 ">
          {data.results.map((trending) => (
            <div
              className="flex-0 flex-grow-0 flex-shrink-0 "
              key={trending.id}
            >
              <Link href={`/Details/${trending.media_type}/${trending.id}/`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${trending.poster_path}`}
                  alt={trending.name}
                  width={200}
                  height={500}
                  className="object-cover rounded-lg hover:outline hover:outline-offset-1 mb-2 hover:outline-white  hover:rounded-lg hover:transition  transition duration-300 ease-in-out"
                />
                <h1 className="text-center">
                  {trending.name || trending.title}
                </h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
/**/
