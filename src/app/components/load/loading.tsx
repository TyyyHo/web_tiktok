"use client";

import { ReactNode, useEffect, useState } from "react";
import "./loading.css";
import { useLoadingStore } from "@/app/store/loadingStore";

export default function Loading(): ReactNode {
  const [display, setDisplay] = useState<boolean>(true);
  const { fetchFFmpeg, loading } = useLoadingStore();

  useEffect(() => {
    fetchFFmpeg();
  }, []);

  function activeAudio() {
    const audio = document.querySelector("audio");
    const IsDesktop = detectDevice();
    if (IsDesktop) audio!.volume = 0.4;
    audio?.play();
    setDisplay(false);
  }

  if (display)
    return (
      <section className="absolute w-full h-full bg-[#112839] top-0 flex flex-col justify-center items-center z-10">
        <div className={`loader`}></div>
        {loading ? (
          <p className="text-white text-xl font-bold mt-6 px-2 py-1">Loading</p>
        ) : (
          <button className="z-0 text-white text-xl font-bold rounded-md border border-white mt-6 px-2 py-1" onClick={activeAudio}>
            Enter
          </button>
        )}
      </section>
    );
}

function detectDevice() {
  return !/Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
