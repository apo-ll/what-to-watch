// app/Details/[...slug]/page.jsx

'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

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

  const { data } = useQuery({
    queryKey: ["details", id, media_type],
    queryFn: async () => await fetchDetails(id, media_type),
  })


  return (
    <div>
      <div key={data}>
      <h1>{data && data.original_name}</h1>
      <Image
        src={`https://image.tmdb.org/t/p/original${data && data.backdrop_path}`}
        alt={data && data.original_name}
        width={1920}
        height={1080}
        className="object-cover h-full w-full"
      />
      </div>
    </div>
  );
}