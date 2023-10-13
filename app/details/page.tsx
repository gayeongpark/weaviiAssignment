"use client";
import React from "react";
import { useRouter } from "next/router";

export default function Details() {
  const router = useRouter();
  const artistId = router.query.id;  
  return (
    <div>
      <h2>Artist Details</h2>
      <p>Artist ID: {artistId}</p>
    </div>
  );
}
