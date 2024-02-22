'use client'

import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

export default function Details() {
  const router = useRouter()
  const { media_type, id } = router.query()

  async function fetchDetails(id, media_type) {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}?language=en-US`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      }
    )
    return response.json()
  }

  const { data } = useQuery(
    ["details", id, media_type],
    () => fetchDetails(id, media_type),
    { enabled: !!id && !!media_type }
  )

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
    </div>
  )
}