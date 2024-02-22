// app/Details/[...slug]/page.jsx

'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query';

export default function Details() {
  const { media_type, id } = useParams();

  console.log(media_type, id);

  async function fetchDetails(id, media_type) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch details");
      }

      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const { data } = useQuery({
    queryKey: ["details", id, media_type],
    queryFn: async () => await fetchDetails(id, media_type),
  })

  if (!data) {
    return <div>Error: Failed to fetch details</div>;
  }

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
    </div>
  );
}