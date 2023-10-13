"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Artist {
  name: string;
  id: string;
  image: string;
}

interface ArtistsProps {
  search: string;
}

export default function Artists({ search }: ArtistsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  // console.log(searchQuery);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://joyce-spotify-graphql.herokuapp.com/graphql?query=%7B%0A%20%20queryArtists(byName%3A%22Red%20Hot%20Chili%20Peppers%22)%20%7B%0A%20%20%20%20name%0A%20%20%20%20id%0A%20%20%20%20image%0A%20%20%7D%0A%7D%0A",
          {
            method: "POST", //most graphQL data is using post method, insted of get method.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
              {
                queryArtists {
                  name
                  id
                  image
                }
              }
            `,
            }),
          }
        );
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        setArtists(result.data.queryArtists);
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {artists
        .filter((artist) => {
          return search.toLowerCase() === ""
            ? artist
            : artist.name.toLowerCase().includes(search);
        })
        .map((artist) => (
          <Link
            key={artist.id}
            href={`../details/${artist.id}`}
            className="group"
          >
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              {artist.image !== "" ? (
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              ) : (
                <img
                  src="../music-album.png"
                  alt={artist.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              )}
            </div>
            <h3 className="mt-4 text-xl text-white">{artist.name}</h3>
          </Link>
        ))}
    </div>
  );
}
