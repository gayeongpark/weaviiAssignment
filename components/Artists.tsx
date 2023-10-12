"use client";
import React, { useState, useEffect } from "react";

interface Artist {
  name: string;
  id: string;
  image: string;
}

interface ArtistsProps {
  searchQuery: string;
}

export default function Artists({ searchQuery }: ArtistsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(apiUrl)
        const query = `
          {
            queryArtists(byName: "${searchQuery}") {
              name
              id
              image
            }
          }
        `;
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
                queryArtists(byName: "Red Hot Chili Peppers") {
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
        if (!response) {
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
  }, [searchQuery]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="m-4">
      {artists?.map((artist) => (
        <div
          key={artist.id}
          className="flex justify-between flex-row items-center"
        >
          {artist.image !== "" ? (
            <img
              src={artist.image}
              alt={artist.name}
              className="w-20 h-20 object-cover rounded-full"
            />
          ) : (
            <img
              src="../album.png"
              alt={artist.name}
              className="w-20 h-20 object-cover rounded-full"
            />
          )}
          <h2 className="mt-2 text-lg font-medium">{artist.name}</h2>
        </div>
      ))}
    </div>
  );
}
