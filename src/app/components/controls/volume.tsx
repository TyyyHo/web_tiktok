import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Volume() {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const audioRef = useRef<null | HTMLAudioElement>(null);

  function handleVolume() {
    audioRef.current!.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    setIsMuted(false);
  }, []);

  return (
    <button className="rounded-full z-10 m-[2px]" onClick={handleVolume}>
      <Image
        className="bg-[#1a1a1a] rounded-full p-2 w-[55px] h-[55px]"
        src={`/img/volume_${isMuted ? "off" : "on"}.webp`}
        alt="切換前後鏡頭"
        priority
        width={55}
        height={55}
      ></Image>
    </button>
  );
}
