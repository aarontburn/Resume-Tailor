"use client";

import { useEffect } from "react";
import { getAllCookies } from "../common/cookie";


export default function Home() {
  useEffect(() => {
    (async () => {
      console.log((await getAllCookies()).map(c => `${c.name}: ${c.value} `))
    })();
  });

  return (
    <p>Home</p>
  );
}
